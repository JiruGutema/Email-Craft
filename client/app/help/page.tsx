"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
} from "lucide-react";
import { ComposerSidebar } from "@/components/sidebar/composer-sidebar";
import { ComposerHeader } from "@/components/header/composer-header";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/lib/utils";
import Spinner from "@/components/spinner";
import { helpSections, faqs } from "./help-data";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("getting-started");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = AuthGuard();
    setIsAuthenticated(auth);
    if (!auth) {
      router.replace("/login");
    }
  }, [router]);

  if (!isAuthenticated) {
    return <Spinner />;
  }

  const filteredSections = helpSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.articles.some(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="flex h-screen bg-background text-foreground">
      <ComposerSidebar />
      <div className="flex-1 overflow-scroll">
      <ComposerHeader
        onProfileClick={() => {
          window.location.href = "/profile";
        }}
      />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <Tabs defaultValue="articles" className="w-full">
                    <TabsContent value="articles" className="space-y-6">
                      {/* Help Sections */}
                      {filteredSections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;

                        return (
                          <Card
                            key={section.id}
                            className="border rounded border-gray-700/40 hover:border-green-600 transition-colors cursor-pointer"
                            onClick={() => setActiveSection(section.id)}
                          >
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-primary/10 ">
                                    <Icon className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <CardTitle className="text-xl">
                                      {section.title}
                                    </CardTitle>
                                    <CardDescription>
                                      {section.description}
                                    </CardDescription>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {section.articles.map((article, index) => (
                                  <div key={index} className=" pl-4 py-2">
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                      {article.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {article.content}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}

                      {filteredSections.length === 0 && searchQuery && (
                        <Card>
                          <CardContent className="text-center py-8">
                            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                              No results found
                            </h3>
                            <p className="text-muted-foreground">
                              Try adjusting your search terms or browse the
                              categories above.
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>

                    <TabsContent value="faq">
                      <Card>
                        <CardHeader>
                          <CardTitle>Frequently Asked Questions</CardTitle>
                          <CardDescription>
                            Quick answers to common questions about our email
                            composer
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            {faqs.map((faq, index) => (
                              <AccordionItem
                                key={index}
                                value={`item-${index}`}
                              >
                                <AccordionTrigger className="text-left">
                                  {faq.question}
                                </AccordionTrigger>
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
  );
}
