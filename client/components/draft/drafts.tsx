"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Edit3,
  Trash2,
  Send,
  Mail,
  Filter,
  SortDesc,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [sortBy, setSortBy] = useState<"date" | "subject" | "recipient">("date");
  const [filterBy, setFilterBy] = useState<"all" | "high" | "medium" | "low">("all");

  // Mock draft data
  const [drafts, setDrafts] = useState<Draft[]>([
    {
      id: "1",
      to: "john.doe@example.com",
      subject: "Project Update - Q4 Review",
      body: "<p>Hi John,</p><p>I wanted to provide you with an update on our Q4 project progress. We have successfully completed the initial phase and are now moving into the implementation stage...</p>",
      createdAt: new Date("2024-01-15T10:30:00"),
      lastModified: new Date("2024-01-15T14:45:00"),
    },
    {
      id: "2",
      to: "marketing@company.com",
      subject: "New Campaign Proposal",
      body: "<p>Dear Marketing Team,</p><p>I have prepared a comprehensive proposal for our upcoming spring campaign. The strategy focuses on digital engagement and customer retention...</p>",
      createdAt: new Date("2024-01-14T09:15:00"),
      lastModified: new Date("2024-01-14T16:20:00"),
    },
    {
      id: "3",
      to: "sarah.wilson@client.com",
      subject: "Meeting Follow-up",
      body: "<p>Hi Sarah,</p><p>Thank you for taking the time to meet with us yesterday. As discussed, I am attaching the documents we reviewed and the next steps for our collaboration...</p>",
      createdAt: new Date("2024-01-13T11:00:00"),
      lastModified: new Date("2024-01-13T11:30:00"),
    },
    {
      id: "4",
      to: "team@startup.com",
      subject: "Weekly Team Sync",
      body: "<p>Hello Team,</p><p>Here are the key points from this week and our agenda for the upcoming team sync meeting...</p>",
      createdAt: new Date("2024-01-12T08:45:00"),
      lastModified: new Date("2024-01-12T15:10:00"),
    },
  ]);

  const filteredDrafts = drafts
    .filter((draft) => {
      const matchesSearch =
        draft.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        draft.to.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterBy === "all";
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return b.lastModified.getTime() - a.lastModified.getTime();
        case "subject":
          return a.subject.localeCompare(b.subject);
        case "recipient":
          return a.to.localeCompare(b.to);
        default:
          return 0;
      }
    });

  const handleEdit = (draftId: string) => {
    console.log("[v0] Editing draft:", draftId);
    // Navigate to composer with draft data
  };

  const handleDelete = (draftId: string) => {
    console.log("[v0] Deleting draft:", draftId);
    setDrafts(drafts.filter((draft) => draft.id !== draftId));
  };

  const handleSend = (draftId: string) => {
    console.log("[v0] Sending draft:", draftId);
    // Send email and remove from drafts
    setDrafts(drafts.filter((draft) => draft.id !== draftId));
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
                            variant="ghost"
                            size="icon"
                            className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(draft.id)}>
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSend(draft.id)}>
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
