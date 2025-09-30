"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Edit3,
  Trash2,
  Send,
  Mail,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteDraft, getDrafts } from "@/lib/drafts";
import { getToken, Logger } from "@/lib/utils";
import { set } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

interface Draft {
  id: string;
  to: string;
  subject: string;
  body: string;
  createdAt: Date;
  lastModified: Date;
}

export default function DraftsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "subject" | "recipient">(
    "date"
  );
  const [filterBy, setFilterBy] = useState<"all" | "high" | "medium" | "low">(
    "all"
  );

  // Mock draft data
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      const drafts = await getDrafts(getToken() || "");
      if( drafts.status === 401) {
        toast({
          description: "Session expired. Please logout and then login.",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
      setDrafts(await drafts.json());
    };
    fetchDrafts();
  }, []);
let filteredDrafts: Draft[] = [];
if (drafts.length > 0) {
   filteredDrafts = 
  drafts.filter((draft) => {
      const matchesSearch =
        draft.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        draft.to.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterBy === "all";
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "subject":
          return a.subject.localeCompare(b.subject);
        case "recipient":
          return a.to.localeCompare(b.to);
        default:
          return 0;
      }
    });
  }
  const handleEdit = (to: string, subject: string, body: string) => {
    const draft = {
      to,
      subject,
      body,
    };
    localStorage.setItem("composerFormCache", JSON.stringify(draft));
    setTimeout(() => {
      window.location.href = "/composer";
    }, 1000);
  };

  const handleDelete = async (draftId: string) => {
    const draft = await deleteDraft(draftId, getToken() || "");
    if (draft.ok) {
      setDrafts(drafts.filter((draft) => draft.id !== draftId));
      toast({ description: "Draft deleted successfully" });
    } else {
      Logger.error("Failed to delete draft");
      toast({ description: "Failed to delete draft", variant: "destructive" });
    }
  };

  const handleSend = (to: string, subject: string, body: string) => {
    toast({ description: "Please, Review it first" })
    setTimeout(() => {
      handleEdit(to, subject, body); 
    }, 3000);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").substring(0, 120) + "...";
  };

  return (
    <div className=" bg-background flex flex-col">
      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drafts by subject or recipient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>
        </div>

        {/* Drafts List */}
        <div className="">
          <div className="">
            {filteredDrafts.length === 0 ? (
              <div className="flex mb-3 flex-col items-center justify-center py-12">
                <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No drafts found
                </h3>
                <p className="text-muted-foreground text-center">
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : "Start composing your first email draft"}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {filteredDrafts.map((draft) => (
                  
                  <div
                    key={draft.id}
                    onClick={() => handleEdit(draft.to, draft.subject, draft.body)}
                    role="button"
                    tabIndex={0}
                    className="flex flex-col sm:flex-row items-start sm:items-center rounded-md border border-border bg-card px-4 py-2 hover:bg-muted transition-colors group"
                  >
                    {/* Main content */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="font-medium text-foreground">
                          {draft.subject}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          — {draft.to}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground flex-nowrap flex overflow-hidden min-w-1">
                        {stripHtml(draft.body)}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:ml-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(draft.lastModified)}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleEdit(draft.to, draft.subject, draft.body)
                            }
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSend(draft.to, draft.subject, draft.body)}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send Now
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(draft.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
