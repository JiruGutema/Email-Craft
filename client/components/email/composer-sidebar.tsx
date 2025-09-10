import { useState } from "react"
import { usePathname } from "next/navigation"
import { HelpCircle, Home, Send, Menu, BookTemplate, Heart } from "lucide-react"
import { NavItem } from "@/components/nav-item"

export function ComposerSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Sidebar content as a component for reuse
  const SidebarContent = (
    <div className="bg-background text-foreground flex flex-col h-full">
      <nav className="space-y-1 px-1 pt-4 flex-1">
        <NavItem
          href="/"
          
          icon={<Home className="h-4 w-4" />}
          active={pathname === "/"}
        >
          Home
        </NavItem>
        <NavItem
          href="/composer"
          icon={<Send className="h-4 w-4" />}
          active={pathname === "/composer"}
        >
          Compose
        </NavItem>
        <NavItem
          href="/drafts"
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline points="22,6 12,13 2,6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          active={pathname === "/drafts"}
        >
          Drafts
        </NavItem>
      
        <NavItem
          href="/help"
          icon={<HelpCircle className="h-4 w-4" />}
          active={pathname === "/help"}
        >
          Help
        </NavItem>
        <NavItem href="/templates" icon={<BookTemplate className="h-4 w-4" />} active={pathname === "/templates"}>
          Templates
        </NavItem>
        <NavItem href="/favorites" icon={<Heart className="h-4 w-4" />} active={pathname === "/favorites"}>
          Favorites
        </NavItem>
      </nav>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="">
        {/* Mobile menu button - fixed at top left */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-white border shadow hover:bg-gray-100 focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Sidebar for desktop */}
        <div className="hidden md:flex w-64 border-r bg-white flex-col h-screen">
          {SidebarContent}
        </div>

        {/* Sidebar drawer for mobile */}
        {open && (
          <div className="fixed inset-0 z-40 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setOpen(false)}
            />
            {/* Drawer */}
            <div className="relative w-64 bg-white border-r h-full flex flex-col z-50">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 p-2 rounded hover:bg-gray-100 focus:outline-none"
                aria-label="Close sidebar"
              >
                <span className="text-xl">&times;</span>
              </button>
              {SidebarContent}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
