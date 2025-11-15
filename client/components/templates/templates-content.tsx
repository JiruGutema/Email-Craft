"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Eye, Download, ArrowLeft, Heart, ThumbsUp, BookmarkCheckIcon, BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { getTemplates } from "@/lib/template";
import { getCategories } from "@/lib/category";
import { toast } from "@/hooks/use-toast";
import Spinner from "../spinner";
import { TemplateData } from "@/lib/types";
import { addFavorite } from "@/lib/favourite";

const categories = await (async function fetchCategories() {
  try {
    const res = await getCategories();

    if (res.status === 401) {
      toast({
        description: "Session expired. Please log in again.",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
      return [];
    }

    if (!res.ok) {
      toast({
        description: "Failed to load categories",
        variant: "destructive",
      });
      return [];
    }

    // success case
    return await res.json();
  } catch (err) {
    console.error("Network error fetching categories:", err);
    toast({
      description: "Network error. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
})();

export default function TemplatesPage() {
  const [emailTemplates, setEmailTemplates] = useState<TemplateData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(
    null
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false; // prevent state updates if unmounted

    async function fetchTemplates() {
      try {
        const res = await getTemplates();
        if (res.status === 401) {
          toast({
            description: "Session expired. Please log in again.",
          });
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
          return;
        }

        if (!res.ok) {
          toast({
            description: "Failed to load templates",
            variant: "destructive",
          });
          if (!ignore) setEmailTemplates([]);
          return;
        }

        // success case
        let templates = await res.json();
        if (!ignore) setEmailTemplates(templates);
        setLoading(false);
      } catch (err) {
        console.error("Network error fetching templates:", err);
        toast({
          description: "Network error. Please try again later.",
          variant: "destructive",
        });
        if (!ignore) setEmailTemplates([]);
      }
    }

    fetchTemplates();

    return () => {
      ignore = true; // cleanup on unmount
    };
  }, []);

  const filteredTemplates = emailTemplates.filter((template) => {
    const matchesCategory =
      selectedCategory === "All" || template.categoryId === selectedCategory;
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (body: string) => {
    const draft = {
      to: [],
      subject: "",
      body: body,
    };
    localStorage.setItem("composerFormCache", JSON.stringify(draft));
    setTimeout(() => {
      window.location.href = "/composer";
    }, 500);
    setPreviewOpen(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className=" top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div></div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            key="All"
            variant={selectedCategory === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("All")}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((category: { id: string; name: string }) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  {/* HTML Preview instead of image */}
                  <div
                    className="w-full h-full overflow-auto bg-white border border-border rounded-t-lg"
                    dangerouslySetInnerHTML={{
                      __html:
                        template.htmlContent || "<p>No preview available</p>",
                    }}
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                    <Dialog
                      open={previewOpen && selectedTemplate?.id === template.id}
                      onOpenChange={setPreviewOpen}
                    >
                      <button
                        className={
                          "absolute top-4 right-4 p-2 bg-transparent transition " +
                          (template.isFavorite ? "text-green-700 " : "text-red-600")
                        }
                        style={{ zIndex: 10 }}
                        onClick={async () => {
                          try {
                            if (!template.id) {
                              toast({
                                description: "Invalid template ID.",
                                variant: "destructive",
                              });
                              return;
                            }

                            const res = await addFavorite(template.id);
                            if (res.status === 401) {
                              toast({
                                description: "Session expired. Please log in again.",
                              });
                              setTimeout(() => {
                                window.location.href = "/login";
                              }, 3000);
                              return;
                            }

                            if (!res.ok) {
                              toast({
                                description: "Failed to update favorites.",
                                variant: "destructive",
                              });
                              return;
                            }

                            const data = await res.json();

                            toast({
                              description: data.message,
                              variant:
                                data.message === "Template unfavorited successfully"
                                  ? "destructive"
                                  : "default",
                            });

                            setEmailTemplates((prev) =>
                              prev.map((t) =>
                                t.id === template.id
                                  ? {
                                      ...t,
                                      isFavorite: data.message !== "Template unfavorited successfully",
                                    }
                                  : t
                              )
                            );
                          } catch (error) {
                            console.error("Error toggling favorite:", error);
                            toast({
                              description: "Failed to update favorite.",
                              variant: "destructive",
                            });
                          }
                        }}
                      >
                        <BookmarkCheckIcon
                          className="icon w-8 h-8 border-none text-transparent"
                          fill={template.isFavorite ? "foreground" : "background"}
                        />
                      </button>
                      <DialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle className="flex items-center justify-between">
                            <span>{template.title}</span>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium mb-2">Preview</h3>
                              <button
                                className={
                                  "p-2 bg-transparent transition " +
                                  (template.isFavorite
                                    ? "text-green-700 "
                                    : "text-red-600")
                                }
                                onClick={async () => {
                                  try {
                                    if (!template.id) {
                                      toast({
                                        description: "Invalid template ID.",
                                        variant: "destructive",
                                      });
                                      return;
                                    }

                                    const res = await addFavorite(
                                      template.id,
                                    );
                                    if (res.status === 401) {
                                      toast({
                                        description:
                                          "Session expired. Please log in again.",
                                      });
                                      setTimeout(() => {
                                        window.location.href = "/login";
                                      }, 3000);
                                      return;
                                    }

                                    if (!res.ok) {
                                      toast({
                                        description:
                                          "Failed to update favorites.",
                                        variant: "destructive",
                                      });
                                      return;
                                    }

                                    const data = await res.json();

                                    toast({
                                      description: data.message,
                                      variant:
                                        data.message ===
                                        "Template unfavorited successfully"
                                          ? "destructive"
                                          : "default",
                                    });

                                    // ✅ Update the local array of templates
                                    setEmailTemplates((prev) =>
                                      prev.map((t) =>
                                        t.id === template.id
                                          ? {
                                              ...t,
                                              isFavorite:
                                                data.message !==
                                                "Template unfavorited successfully",
                                            }
                                          : t
                                      )
                                    );
                                  } catch (error) {
                                    console.error(
                                      "Error toggling favorite:",
                                      error
                                    );
                                    toast({
                                      description: "Failed to update favorite.",
                                      variant: "destructive",
                                    });
                                  }
                                }}
                              >
                                <BookmarkIcon
                                  className="icon w-8 h-8"
                                  fill={
                                    template.isFavorite ? "#15803d" : "white"
                                  } // green if favorite, white otherwise
                                />
                              </button>
                            </div>
                            <div
                              className="border rounded-lg p-4 bg-muted max-h-96 overflow-y-auto"
                              dangerouslySetInnerHTML={{
                                __html: template.htmlContent,
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">
                              Template Details
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Description
                                </p>
                                <p className="text-sm">
                                  {template.description}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Tags
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {template.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex gap-2 pt-4">
                                <Button
                                  onClick={() =>
                                    handleUseTemplate(template.htmlContent)
                                  }
                                  className="flex-1"
                                >
                                  Use Template
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => setPreviewOpen(false)}
                                >
                                  Close
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {template.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setPreviewOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview & Use
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
