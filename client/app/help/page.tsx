"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  Mail,
  Code,
  User,
  Shield,
  Settings,
  HelpCircle,
  MessageCircle,
  Book,
  ChevronRight,
  Play,
  FileText,
  Palette,
} from "lucide-react"
import { ComposerSidebar } from "@/components/email/composer-sidebar"
import { ComposerHeader } from "@/components/email/composer-header"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/lib/utils"
import Spinner from "@/components/spinner"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("getting-started")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = AuthGuard()
    setIsAuthenticated(auth)
    if (!auth) {
      router.replace("/login")
    }
  }, [router])

  if (!isAuthenticated) {
    return <Spinner /> 
  }
  const helpSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Play,
      description: "Learn the basics of using our email composer",
      articles: [
        {
          title: "Creating Your First Email",
          content:
            'Start by clicking the "New Email" button in the composer. Fill in the recipient, subject, and compose your message using our rich HTML editor.',
        },
        {
          title: "Understanding the Interface",
          content:
            "The interface consists of a sidebar for navigation, a header with your profile, and the main composer area where you create emails.",
        },
        {
          title: "Quick Start Guide",
          content: "Get up and running in 5 minutes with our step-by-step quick start guide.",
        },
      ],
    },
    {
      id: "email-composition",
      title: "Email Composition",
      icon: Mail,
      description: "Master the art of creating beautiful emails",
      articles: [
        {
          title: "Using the HTML Editor",
          content:
            "Our HTML editor supports rich text formatting, custom styling, and live preview. Switch between HTML and preview modes using the tabs.",
        },
        {
          title: "Adding Recipients",
          content:
            'Enter email addresses in the "To" field. You can add multiple recipients by separating them with commas.',
        },
        {
          title: "Email Templates",
          content: "Choose from pre-built templates in the sidebar to get started quickly with professional designs.",
        },
        {
          title: "Sending Emails",
          content:
            'Click the "Send Email" button to deliver your message. You\'ll see a confirmation when the email is sent successfully.',
        },
      ],
    },
    {
      id: "html-editing",
      title: "HTML Editing",
      icon: Code,
      description: "Advanced HTML editing features and tips",
      articles: [
        {
          title: "HTML Syntax Highlighting",
          content:
            "The editor provides syntax highlighting for HTML, CSS, and inline styles to help you write clean code.",
        },
        {
          title: "Live Preview",
          content:
            "See your changes in real-time with the preview tab. Switch between HTML and preview modes instantly.",
        },
        {
          title: "Custom Styling",
          content:
            "Add custom CSS styles inline or use classes. The editor supports modern CSS features and responsive design.",
        },
        {
          title: "Best Practices",
          content:
            "Follow email HTML best practices: use tables for layout, inline CSS for styling, and test across different email clients.",
        },
      ],
    },
    {
      id: "user-profiles",
      title: "User Profiles",
      icon: User,
      description: "Manage your account and profile settings",
      articles: [
        {
          title: "Editing Your Profile",
          content:
            "Click your profile picture in the header to access your profile page. Update your name, email, company, and bio.",
        },
        {
          title: "Profile Statistics",
          content: "View your email sending statistics, including emails sent today and total drafts.",
        },
        {
          title: "Account Settings",
          content: "Manage your account preferences, notification settings, and privacy options.",
        },
      ],
    },
    {
      id: "authentication",
      title: "Authentication",
      icon: Shield,
      description: "Login, signup, and security features",
      articles: [
        {
          title: "Creating an Account",
          content: "Sign up with your email and password, or use Google OAuth for quick registration.",
        },
        {
          title: "Logging In",
          content:
            "Access your account using your credentials or Google sign-in. Your session will be remembered for convenience.",
        },
        {
          title: "Password Security",
          content: "Use a strong password and enable two-factor authentication for enhanced security.",
        },
        {
          title: "Account Recovery",
          content: 'If you forget your password, use the "Forgot Password" link to reset it via email.',
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: Settings,
      description: "Common issues and solutions",
      articles: [
        {
          title: "Email Not Sending",
          content:
            "Check your internet connection, verify recipient addresses, and ensure you're logged in. Contact support if issues persist.",
        },
        {
          title: "HTML Not Rendering",
          content:
            "Validate your HTML syntax and check for unclosed tags. Use the preview mode to test your email appearance.",
        },
        {
          title: "Login Issues",
          content: "Clear your browser cache, check your credentials, and try using an incognito window.",
        },
        {
          title: "Performance Issues",
          content: "Close unnecessary browser tabs, clear cache, and ensure you have a stable internet connection.",
        },
      ],
    },
  ]

  const faqs = [
    {
      question: "How do I create my first email?",
      answer:
        'Click the "New Email" button in the composer, fill in the recipient and subject fields, then use our HTML editor to compose your message. You can switch between HTML editing and preview modes.',
    },
    {
      question: "Can I use custom HTML and CSS?",
      answer:
        "Yes! Our editor supports full HTML and CSS customization. You can write custom styles inline or use CSS classes for advanced formatting.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use industry-standard encryption and security practices to protect your data. Your emails and personal information are never shared with third parties.",
    },
    {
      question: "How do I reset my password?",
      answer:
        'Click the "Forgot Password" link on the login page and enter your email address. You\'ll receive a password reset link via email.',
    },
    {
      question: "Can I collaborate with team members?",
      answer:
        "Currently, the platform is designed for individual use. Team collaboration features are planned for future releases.",
    },
    {
      question: "What email formats are supported?",
      answer:
        "We support HTML emails with full CSS styling. Plain text emails are also supported for simpler communications.",
    },
  ]

  const filteredSections = helpSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.articles.some(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  )

 return (
    <div className="flex h-screen bg-white">
      <ComposerSidebar />

      <div className="flex-1">
        
<div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 text-balance">Help & Documentation</h1>
            <p className="text-xl opacity-90 mb-6 text-pretty">
              Everything you need to know about using our email composer
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background text-foreground"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {helpSections.map((section) => {
                    const Icon = section.icon
                    return (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveSection(section.id)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {section.title}
                      </Button>
                    )
                  })}
                </CardContent>
              </Card>

            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="articles" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="articles">Help Articles</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="articles" className="space-y-6">
                  {/* Quick Start Cards */}
                  {!searchQuery && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <Card className="border-accent/20 hover:border-accent/40 transition-colors cursor-pointer">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-accent/10 rounded-lg">
                              <Mail className="h-5 w-5 text-accent" />
                            </div>
                            <CardTitle className="text-lg">Compose Email</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">Learn how to create and send your first email</p>
                        </CardContent>
                      </Card>

                      <Card className="border-secondary/20 hover:border-secondary/40 transition-colors cursor-pointer">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-secondary/10 rounded-lg">
                              <Palette className="h-5 w-5 text-secondary" />
                            </div>
                            <CardTitle className="text-lg">HTML Styling</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">Master HTML editing and custom styling</p>
                        </CardContent>
                      </Card>

                      <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg">Profile Setup</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">Configure your profile and account settings</p>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Help Sections */}
                  {filteredSections.map((section) => {
                    const Icon = section.icon
                    const isActive = activeSection === section.id

                    return (
                      <Card key={section.id} className={isActive ? "ring-2 ring-primary/20" : ""}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-xl">{section.title}</CardTitle>
                                <CardDescription>{section.description}</CardDescription>
                              </div>
                            </div>
                            <Badge variant="secondary">{section.articles.length} articles</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {section.articles.map((article, index) => (
                              <div key={index} className="border-l-2 border-muted pl-4 py-2">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  {article.title}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{article.content}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}

                  {filteredSections.length === 0 && searchQuery && (
                    <Card>
                      <CardContent className="text-center py-8">
                        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No results found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search terms or browse the categories above.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="faq">
                  <Card>
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                      <CardDescription>Quick answers to common questions about our email composer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</div>
 )}