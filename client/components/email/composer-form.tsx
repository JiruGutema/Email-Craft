"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Send, Eye, Code, Paperclip } from "lucide-react"
import type { EmailData } from "@/lib/types"

export function ComposerForm() {
  const [emailData, setEmailData] = useState<EmailData>({
    to: "",
    subject: "",
    htmlBody: "",
  })
  const [activeTab, setActiveTab] = useState("compose")
  const [isSending, setIsSending] = useState(false)

  const handleSendEmail = async () => {
    setIsSending(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })

      if (response.ok) {
        console.log("Email sent successfully")
        // Reset form or show success message
        setEmailData({ to: "", subject: "", htmlBody: "" })
      } else {
        console.error("Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Email Form */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <Input
              id="to"
              type="email"
              placeholder="recipient@example.com"
              value={emailData.to}
              onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
              className="w-1/2 text-black"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <Input
              id="subject"
              type="text"
              placeholder="Enter email subject"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              className="w-1/2"
            />
          </div>
        </div>

        {/* HTML Body Editor with Tabs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Content</label>
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

            <TabsContent value="compose" className="mt-4">
              <Textarea
                placeholder="Enter your HTML content here..."
                value={emailData.htmlBody}
                onChange={(e) => setEmailData({ ...emailData, htmlBody: e.target.value })}
                className="min-h-[400px] font-mono text-sm"
              />
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="border rounded-lg p-4 min-h-[400px] bg-gray-50">
                <div className="bg-white p-6 rounded shadow-sm">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: emailData.htmlBody || '<p class="text-gray-500">No content to preview</p>',
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
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Paperclip className="h-4 w-4" />
              Attach
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Save Draft</Button>
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
  )
}
