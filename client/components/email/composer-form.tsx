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

export function ComposerForm() {
  const [emailData, setEmailData] = useState<EmailData>({
    to: "",
    subject: "",
    html: "",
  });
  const [activeTab, setActiveTab] = useState("compose");
  const [isSending, setIsSending] = useState(false);

  // Load cached form data on mount
  useEffect(() => {
    const cached = localStorage.getItem("composerFormCache");
    if (cached) {
      try {
        setEmailData(JSON.parse(cached));
      } catch {}
    }
  }, []);

  // Cache form data on change
  useEffect(() => {
    localStorage.setItem("composerFormCache", JSON.stringify(emailData));
  }, [emailData]);

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mail/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(emailData),
        }
      );

      if (response.ok) {
        console.log("Email sent successfully");
        setEmailData({ to: "", subject: "", html: "" });
        localStorage.removeItem("composerFormCache"); // Clear cache on success
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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
            <Input
              id="to"
              type="email"
              placeholder="recipient@example.com"
              value={emailData.to}
              onChange={(e) =>
                setEmailData({ ...emailData, to: e.target.value })
              }
              className="w-1/2 text-black"
            />
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
                setEmailData({ ...emailData, subject: e.target.value })
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
                // variant="outline"
                size="sm"
                className="ml-4"
                onClick={async () => {
                  if (navigator.clipboard) {
                    const text = await navigator.clipboard.readText();
                    setEmailData((prev) => ({ ...prev, html: text }));
                  }
                }}
              >
                <ClipboardPaste className="h-8 w-8" />
              </Button>
            <TabsContent value="compose" className="mt-4">
              <Editor
                value={emailData.html}
                onValueChange={(code) =>
                  setEmailData({ ...emailData, html: code })
                }
                highlight={(code) =>
                  Prism.highlight(code, Prism.languages.markup, "markup")
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
              <div className="border p-4 min-h-[400px] bg-gray-50">
                <div className="bg-white p-6">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        emailData.html ||
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
            <Button /* variant="outline" */>Save Draft</Button>
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
