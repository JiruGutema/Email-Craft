'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { subscribe } from "@/lib/subscribe"
import { AuthGuard, Logger } from "@/lib/utils"
import { Edit3, User, Shield, Star, ArrowRight, MoonStar } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {

    const checkAuth = async () => {
      const isAuth = AuthGuard();
      setIsAuthenticated(isAuth);
    };
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
    setUser(user);
    checkAuth();
  }, []);

const handleSubscription = async (email: string) => {
  // Validate email format
  if (!/\S+@\S+\.\S+/.test(email)) {
    toast({
      description: "Please enter a valid email address.",
      variant: "destructive",
    });
    return;
  }

  try {
    const res = await subscribe(email);
    const data = await res.json().catch(() => null); // safe fallback if response is empty

    if (res.ok) {
      toast({
        description: data?.message || "Subscribed successfully!",
        variant: "default",
      });
    } else {
      Logger.error("Subscription failed:", res.status, res.statusText, data);
      toast({
        description: data?.message || "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  } catch (error) {
    Logger.error("Network error during subscription:", error);
    toast({
      description: "Network error. Please try again later.",
      variant: "destructive",
    });
  }
};

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="./images/logo.png" alt="Logo" className="h-8 w-8 text-accent" />
              
              <span className="text-xl font-semibold text-foreground">Email Craft</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </Link>
              <Link href="#support" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms and Privacy
              </Link>
            </nav>

            <div className="flex items-center gap-4">
   <Button
          variant="outline"
          size="sm"
          className="ml-2"
          onClick={() => {
            if (typeof window !== "undefined") {
              document.documentElement.classList.toggle("dark");
            }
          }}
        >
          <MoonStar className="h-4 w-4" />
        </Button>
              {isAuthenticated ? (
              <Link href="/profile">
               {user?.picture ? (
                 <img
                   src={`${user?.picture || "/default-profile.png"}`}
                   alt=""
                   className="h-10 w-10 rounded-full border border-border"
                 />
               ) : (
                 <User className="h-6 w-6 text-muted-foreground" />
               )}
                
              
              </Link>
              ) : (
              <>
                <Link href="/login">
                <Button variant="ghost" className=" bg-accent hover:bg-accent/70 text-accent-foreground">
                  Login
                </Button>
                </Link>
                <Link href="/login">
                <Button className="bg-accent hover:bg-accent/70 text-accent-foreground">Sign Up</Button>
                </Link>
              </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Compose Stunning Emails <span className="text-accent">Effortlessly</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
              Professional HTML email editing with user profiles and seamless authentication. Create beautiful,
              responsive emails that engage your audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/composer">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Start Composing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
              Everything you need to create amazing emails
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Powerful features designed for modern email composition and management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Edit3 className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">HTML Email Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Create beautiful, responsive HTML emails with our intuitive editor. Real-time preview and professional
                  templates included.
                  <p className="mt-2 text-red-500">
                    All HTML rendering is done on the client side for maximum privacy and security. which means your HTML
                    is never exposed to the server and is only processed in the user's browser.
                  </p>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <User className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">User Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Manage your account, track email statistics, and customize your workspace with comprehensive user
                  profile management.
                  <p className="mt-2">
                    Your profile data is securely stored and managed, your active sessions are monitored, and you have full control
                    over your account settings.
                  </p> <p className="m-2 text-red-500 font-bold">your active session lasts for maximum 60 minutes of inactivity. </p>
                  

                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">Secure Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Enterprise-grade security with Google OAuth integration. Your data is protected with industry-standard
                  encryption.
               
                   Ensuring a secure and seamless login experience without handling passwords directly.
              
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" id="testimonials">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Trusted by professionals worldwide</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ephraim Debel",
                role: "Software Engineer",
                content:
                  "EmailCraft has revolutionized our email campaigns. The HTML editor is intuitive and the results are stunning.",
                rating: 5,
              },
              {
                name: "Ashenafi Godana",
                role: "Cloud Architect",
                content: "The user profile management and authentication system saved us weeks of development time.",
                rating: 5,
              },
              {
                name: "Tsedeke Techane",
                role: "Project Manager",
                content:
                  "Finally, an email composer that understands design. The preview feature is incredibly accurate.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Ready to transform your email game?</h2>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Join thousands of professionals who trust EmailCraft for their email composition needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/signup">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Demo
              </Button>
            </div>
            
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Stay updated</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest updates, tips, and best practices delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                value={email}
              />
              <Button onClick={() => handleSubscription(email)} className="bg-accent hover:bg-accent/90 text-accent-foreground">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                 <img src="./images/logo.png" alt="Logo" className="h-8 w-8 text-accent" />
                <Link href={""} onClick={()=>{window.location.href="/"}}><span className="text-lg font-semibold">Email Craft</span></Link>
              </div>
              <p className="text-muted-foreground text-sm">Professional email composition made simple and beautiful.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
             
                <li>
                  <Link href="/templates" className="hover:text-foreground transition-colors">
                    Templates
                  </Link>
                </li>
             
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
              
             
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Email Craft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}