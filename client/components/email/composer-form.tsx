"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Send, Eye, Code, Paperclip, ClipboardPaste } from "lucide-react";
import type { EmailData } from "@/lib/types";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-markup"; // For HTML highlighting
import { sendEmail } from "@/lib/email";
import { getToken, HandleLogout, Logger } from "@/lib/utils";
import { saveDraft } from "@/lib/drafts";
import { toast } from "@/hooks/use-toast";

export function ComposerForm() {
  const defaultEmailData: EmailData = { to: [], subject: "", body: "" };
  const [emailData, setEmailData] = useState<EmailData>(defaultEmailData);
  const [activeTab, setActiveTab] = useState("compose");
  const [isSending, setIsSending] = useState(false);

  const [composeData, setComposeData] = useState<EmailData>(() => {
    const cached = localStorage.getItem("composerFormCache");
    return cached ? JSON.parse(cached) : { to: "", subject: "", body: "" };
  });

  useEffect(() => {
    localStorage.setItem("composerFormCache", JSON.stringify(composeData));
  }, [composeData]);

  // Load cached form data on mount
  useEffect(() => {
    const cached = localStorage.getItem("composerFormCache");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setEmailData({ ...defaultEmailData, ...parsed });
        console.log("retrieved data", parsed);
      } catch {
        setEmailData(defaultEmailData);
      }
    } else {
      setEmailData(defaultEmailData);
    }
  }, []);

  // Cache form data on change, but only if not empty
  useEffect(() => {
    if (emailData.to || emailData.subject || emailData.body) {
      localStorage.setItem("composerFormCache", JSON.stringify(emailData));
    }
  }, [emailData]);

  const handleSessionExpired = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast({
      description: "Session expired. Please log in again.",
      variant: "destructive",
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      const response = await sendEmail(emailData, getToken() || "");
      const resData = await response.json().catch(() => null);

      if (response.status === 401) {
        handleSessionExpired();
        return;
      }

      if (response.ok) {
        toast({ description: "Email sent successfully" });
        setEmailData(defaultEmailData);
        localStorage.removeItem("composerFormCache");
      } else {
        Logger.error(
          "Failed to send email:",
          response.status,
          response.statusText
        );
        toast({ description: "Failed to send email", variant: "destructive" });
      }

      Logger.log(resData);
    } catch (error) {
      Logger.error("Error sending email:", error);
      toast({
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!emailData.to && !emailData.subject && !emailData.body) {
      toast({ description: "No changes to save" });
      return;
    }

    try {
      const response = await saveDraft(emailData, getToken() || "");
      const resData = await response.json().catch(() => null);

      if (response.status === 401) {
        handleSessionExpired();
        return;
      }

      if (response.ok) {
        Logger.log(resData);
        toast({ description: "Draft saved successfully" });
      } else {
        Logger.error(
          "Failed to save draft:",
          response.status,
          response.statusText
        );
        toast({ description: "Failed to save draft", variant: "destructive" });
      }
    } catch (error) {
      Logger.error("Error saving draft:", error);
      toast({
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-background text-foreground">
      {/* Email Form */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              To
            </label>
            <div
              className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md w-1/2 min-h-[2.5rem]"
              onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
            >
              {emailData.to.map((email, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-sm flex items-center gap-1"
                >
                  {email}
                  <button
                    type="button"
                    onClick={() =>
                      setEmailData((prev) => ({
                        ...prev,
                        to: prev.to.filter((_, idx) => idx !== i),
                      }))
                    }
                    className="text-blue-600 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                id="to"
                type="email"
                placeholder="Enter recipient and press Enter"
                className="flex-grow outline-none bg-transparent p-1 rounded-sm text-black"
                onKeyDown={(e) => {
                  const value = e.currentTarget.value.trim();
                  if (
                    (e.key === "Enter" || e.key === ",") &&
                    value &&
                    /\S+@\S+\.\S+/.test(value)
                  ) {
                    e.preventDefault();
                    setEmailData((prev) => ({
                      ...prev,
                      to: [...prev.to, value],
                    }));
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subject
            </label>
            <Input
              id="subject"
              type="text"
              placeholder="Enter email subject"
              value={emailData.subject}
              onChange={(e) =>
                setEmailData((prev) => ({ ...prev, subject: e.target.value }))
              }
              className="w-1/2"
            />
          </div>
        </div>

        {/* HTML Body Editor with Tabs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Content
          </label>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="compose" className="gap-2">
                <Code className="h-4 w-4" />
                HTML Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
            <Button
              type="button"
              size="sm"
              className="ml-4"
              onClick={async () => {
                if (navigator.clipboard) {
                  const text = await navigator.clipboard.readText();
                  setEmailData((prev) => ({ ...prev, html: text }));
                }
              }}
            >
              <p>Paste</p>
            </Button>
            <TabsContent
              value="compose"
              style={{ height: "500px", overflow: "auto" }}
            >
              <Editor
                value={emailData.body}
                onValueChange={(code) =>
                  setEmailData((prev) => ({ ...prev, body: code }))
                }
                highlight={(code) =>
                  Prism.highlight(code, Prism.languages.markup, "markup")
                }
                padding={16}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  minHeight: 400,
                  borderRadius: 0,
                  border: "1px solid #e5e7eb",
                  color: "#333",
                }}
                textareaId="html-editor"
                textareaClassName="font-mono"
                placeholder="Enter your HTML content here..."
                className="bg-background text-foreground"
              />
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="border p-4 min-h-[400px] bg-gray-50">
                <div className="bg-white p-6">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        emailData.body ||
                        '<p class="text-gray-500">No content to preview</p>',
                    }}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-2">
            <Button
              /*  variant="outline" */
              size="sm"
              className=""
            >
              <Paperclip className="h-4 w-4" />
              Attach
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSaveDraft}>Save Draft</Button>
            <Button
              onClick={handleSendEmail}
              disabled={isSending || !emailData.to || !emailData.subject}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              {isSending ? "Sending..." : "Send Email"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
