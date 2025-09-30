"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCategories } from "@/lib/category";
import {
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplates,
} from "@/lib/template";
import { toast } from "@/hooks/use-toast";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Code, Eye, ClipboardPaste, ArrowLeft, Search } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";
import Editor from "react-simple-code-editor";
import { getLocalUser, getToken, HandleLogout, Logger } from "@/lib/utils";
import { AdminHeader } from "@/components/admin/admin-header";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TemplateData } from "@/lib/types";
import { ComposerSidebar } from "@/components/sidebar/composer-sidebar";
import { isAdmin } from "@/lib/auth";
import Spinner from "@/components/spinner";

export default function TemplatesPage() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [form, setForm] = useState<TemplateData>({
    id: "",
    title: "",
    description: "",
    categoryId: "",
    htmlContent: "",
    tags: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("compose");
  const [emailTemplates, setEmailTemplates] = useState<TemplateData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(
    null
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  // Helper to get token safely
  const getTokenSafe = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  // Helper to fetch and set categories
  const fetchCategoriesAndSet = async () => {
    try {
      const res = await getCategories();
      const cats = await res.json().catch(() => []);
      setCategories(cats);
    } catch (error) {
      Logger.error("Failed to fetch categories:", error);
      toast({
        description: "Failed to load categories",
        variant: "destructive",
      });
    }
  };

  // Helper to fetch and set templates
  const fetchTemplatesAndSet = async () => {
    
    try {
      const res = await getTemplates(getToken() || '');
      const templates: TemplateData[] = await res.json().catch(() => []);
      setEmailTemplates(templates);
    } catch (error) {
      Logger.error("Failed to fetch templates:", error);
      toast({
        description: "Failed to load templates",
        variant: "destructive",
      });
    }
  };

  // Initial load
  useEffect(() => {
    fetchCategoriesAndSet();
  }, []);
  useEffect(() => {
    fetchTemplatesAndSet();
  }, []);

  // Filtered data
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredTemplates = emailTemplates.filter((template) =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CRUD operations
  const handleAddTemplate = async () => {
    try {
      await createTemplate(form, getTokenSafe());
      setAddDialogOpen(false);
      setForm({
        title: "",
        description: "",
        categoryId: "Newsletter",
        htmlContent: "",
        tags: [],
      });
      await fetchTemplatesAndSet();
      toast({ description: "Template added successfully" });
    } catch (error) {
      Logger.error("Failed to add template:", error);
      toast({ description: "Failed to add template", variant: "destructive" });
    }
  };

  const handleUpdateTemplate = async () => {
    if (!selectedTemplate) return;
    try {
      await updateTemplate(selectedTemplate.id || "", form, getTokenSafe());
      setEditDialogOpen(false);
      setSelectedTemplate(null);
      setForm({
        title: "",
        description: "",
        categoryId: "Newsletter",
        htmlContent: "",
        tags: [],
      });
      await fetchTemplatesAndSet();
      toast({ description: "Template updated successfully" });
    } catch (error) {
      Logger.error("Failed to update template:", error);
      toast({
        description: "Failed to update template",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTemplate = async () => {
    if (!selectedTemplate) return;
    try {
      await deleteTemplate(selectedTemplate.id || "", getTokenSafe());
      setDeleteDialogOpen(false);
      setSelectedTemplate(null);
      await fetchTemplatesAndSet();
      toast({ description: "Template deleted successfully" });
    } catch (error) {
      Logger.error("Failed to delete template:", error);
      toast({
        description: "Failed to delete template",
        variant: "destructive",
      });
    }
  };

  // Use template
  const handleUseTemplate = (body: string) => {
    const draft = { to: "", subject: "Please customize subject", body };
    localStorage.setItem("composerFormCache", JSON.stringify(draft));
    setPreviewOpen(false);
    setTimeout(() => {
      window.location.href = "/composer";
    }, 500);
  };

  // Admin check
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await isAdmin(getTokenSafe());
        const data = await response.json().catch(() => null);

        if (response.status === 200) {
          if (!data) {
            toast({
              description: "You don't have permission to access this page.",
              variant: "destructive",
            });
            window.location.href = "/";
            return;
          }
          setIsAdminUser(true);
        } else if ([401, 403].includes(response.status)) {
          toast({
            description: "Session expired. Please login again.",
            variant: "destructive",
          });
          if (response.status === 403) {
            toast({
              description: "You don't have permission to access this page.",
              variant: "destructive",
            });
          }
          setTimeout(() => {
            HandleLogout();
          }, 3000);
        } else {
          Logger.error(
            "Unexpected admin response:",
            response.status,
            response.statusText,
            data
          );
        }
      } catch (error) {
        Logger.error("Error checking admin:", error);
        toast({
          description: "Network error. Please try again.",
          variant: "destructive",
        });
      } finally {
        setAdminChecked(true);
      }
    };

    checkAdmin();
  }, []);

  if (!adminChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!isAdminUser) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <AdminSidebar />

      <div className="flex-1">
        <div className="min-h-screen bg-background">
          {/* Header */}
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-4"></div>
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
                <Button size="sm" onClick={() => setAddDialogOpen(true)}>
                  Add Template
                </Button>
              </div>
            </div>
          </header>
          {/* Add Template Dialog */}
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add New Template</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddTemplate();
                }}
                className="space-y-4"
              >
                <Input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
                <Input
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                />
                {/* Category search/select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Input
                    placeholder="Search or select category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-2"
                  />
                  <div className="flex flex-wrap gap-2 mb-2">
                    {filteredCategories.map((cat) => (
                      <Button
                        key={cat.id}
                        type="button"
                        variant={
                          form.categoryId === cat.id ? "default" : "outline"
                        }
                        onClick={() => setForm({ ...form, categoryId: cat.id })}
                      >
                        {cat.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <Input
                  placeholder="Tags (comma separated)"
                  value={form.tags.join(",")}
                  onChange={(e) =>
                    setForm({ ...form, tags: e.target.value.split(",") })
                  }
                />
                {/* HTML Editor & Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Content
                  </label>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex items-center mb-2">
                      <TabsList className="flex flow-col gap-2">
                        <TabsTrigger
                          value="compose"
                          className="gap-2 flex center bg-foreground text-background rounded-sm p-2"
                        >
                          <Code className="h-4 w-4 " /> HTML Editor
                        </TabsTrigger>
                        <TabsTrigger
                          value="preview"
                          className="gap-2 flex center bg-foreground text-background rounded-sm p-2"
                        >
                          <Eye className="h-4 w-4" /> Preview
                        </TabsTrigger>
                      </TabsList>
                      <Button
                        type="button"
                        size="sm"
                        className="ml-4"
                        onClick={async () => {
                          if (navigator.clipboard) {
                            const text = await navigator.clipboard.readText();
                            setForm((prev) => ({ ...prev, htmlContent: text }));
                          }
                        }}
                      >
                        <ClipboardPaste className="h-8 w-8" />
                      </Button>
                    </div>

                    <TabsContent
                      value="compose"
                      style={{ height: "420px", overflow: "auto" }}
                    >
                      <Editor
                        value={form.htmlContent}
                        onValueChange={(code) =>
                          setForm((prev) => ({ ...prev, htmlContent: code }))
                        }
                        highlight={(code) =>
                          Prism.highlight(
                            code,
                            Prism.languages.markup,
                            "markup"
                          )
                        }
                        padding={16}
                        style={{
                          fontFamily: '"Fira code", "Fira Mono", monospace',
                          fontSize: 14,
                          minHeight: 400,
                          background: "#f5f5f5",
                          borderRadius: 0,
                          border: "1px solid #e5e7eb",
                          color: "#333",
                        }}
                        textareaId="html-editor"
                        textareaClassName="font-mono"
                        placeholder="Enter your HTML content here..."
                      />
                    </TabsContent>
                    <TabsContent value="preview" className="mt-4">
                      <div className="border p-4 min-h-[400px] max-h-[400px] bg-gray-50 overflow-auto rounded">
                        <div className="bg-white p-6">
                          <div
                            style={{ overflow: "auto", maxHeight: "320px" }}
                            dangerouslySetInnerHTML={{
                              __html:
                                form.htmlContent ||
                                '<p class="text-gray-500">No content to preview</p>',
                            }}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                <Button type="submit" className="w-full">
                  Create
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          {/* Edit Template Dialog */}
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Template</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateTemplate();
                }}
                className="space-y-4"
              >
                <Input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
                <Input
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Category"
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm({ ...form, categoryId: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Tags (comma separated)"
                  value={form.tags.join(",")}
                  onChange={(e) =>
                    setForm({ ...form, tags: e.target.value.split(",") })
                  }
                />
                {/* HTML Editor & Preview for Edit Dialog */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Content
                  </label>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex items-center mb-2">
                      <TabsList className="flex flow-col gap-2">
                        <TabsTrigger
                          value="compose"
                          className="gap-2 flex center bg-foreground text-background rounded-sm p-2"
                        >
                          <Code className="h-4 w-4 " /> HTML Editor
                        </TabsTrigger>
                        <TabsTrigger
                          value="preview"
                          className="gap-2 flex center bg-foreground text-background rounded-sm p-2"
                        >
                          <Eye className="h-4 w-4" /> Preview
                        </TabsTrigger>
                      </TabsList>
                      <Button
                        type="button"
                        size="sm"
                        className="ml-4"
                        onClick={async () => {
                          if (navigator.clipboard) {
                            const text = await navigator.clipboard.readText();
                            setForm((prev) => ({ ...prev, htmlContent: text }));
                          }
                        }}
                      >
                        <ClipboardPaste className="h-8 w-8" />
                      </Button>
                    </div>
                    <TabsContent
                      value="compose"
                      style={{ height: "420px", overflow: "auto" }}
                    >
                      <Editor
                        value={form.htmlContent}
                        onValueChange={(code) =>
                          setForm((prev) => ({ ...prev, htmlContent: code }))
                        }
                        highlight={(code) =>
                          Prism.highlight(
                            code,
                            Prism.languages.markup,
                            "markup"
                          )
                        }
                        padding={16}
                        style={{
                          fontFamily: '"Fira code", "Fira Mono", monospace',
                          fontSize: 14,
                          minHeight: 400,
                          background: "#f5f5f5",
                          borderRadius: 0,
                          border: "1px solid #e5e7eb",
                          color: "#333",
                        }}
                        textareaId="html-editor-edit"
                        textareaClassName="font-mono"
                        placeholder="Enter your HTML content here..."
                      />
                    </TabsContent>
                    <TabsContent value="preview" className="mt-4">
                      <div className="border p-4 min-h-[400px] max-h-[400px] bg-gray-50 overflow-auto rounded">
                        <div className="bg-white p-6">
                          <div
                            style={{ overflow: "auto", maxHeight: "320px" }}
                            dangerouslySetInnerHTML={{
                              __html:
                                form.htmlContent ||
                                '<p class="text-gray-500">No content to preview</p>',
                            }}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                <Button type="submit" className="w-full">
                  Update
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          {/* Delete Template Dialog */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Delete Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Are you sure you want to delete this template?</p>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={handleDeleteTemplate}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          {/* Templates Grid */}
          <div className="container mx-auto px-4 py-8">
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
                            template.htmlContent ||
                            "<p>No preview available</p>",
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                        <Dialog
                          open={
                            previewOpen && selectedTemplate?.id === template.id
                          }
                          onOpenChange={setPreviewOpen}
                        >
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
                                <h3 className="font-medium mb-2">Preview</h3>
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
                                      variant="outline"
                                      onClick={() => setEditDialogOpen(true)}
                                      className="flex-1"
                                      onClickCapture={() => {
                                        setForm(template);
                                        setSelectedTemplate(template);
                                      }}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => setDeleteDialogOpen(true)}
                                      className="flex-1"
                                      onClickCapture={() =>
                                        setSelectedTemplate(template)
                                      }
                                    >
                                      Delete
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
                      <h3 className="text-lg font-semibold text-primary">
                        {template.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
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
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* ...existing code... */}
          </div>
        </div>
      </div>
    </div>
  );
}
