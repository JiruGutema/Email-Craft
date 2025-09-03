import { useState } from "react"
import { usePathname } from "next/navigation"
import { HelpCircle, Home, Send, Menu } from "lucide-react"
import { NavItem } from "@/components/nav-item"

export function ComposerSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Sidebar content as a component for reuse
  const SidebarContent = (
    <>
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
          href="/sent"
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          active={pathname === "/sent"}
        >
          Sent
        </NavItem>
        <NavItem
          href="/help"
          icon={<HelpCircle className="h-4 w-4" />}
          active={pathname === "/help"}
        >
          Help
        </NavItem>
        <div className="py-3">
          <div className="px-3 text-xs font-medium uppercase text-gray-500">Templates</div>
          <div className="mt-2">
            <NavItem href="#" icon={<div className="w-4 h-4 bg-blue-100 rounded"></div>}>
              Newsletter
            </NavItem>
            <NavItem href="#" icon={<div className="w-4 h-4 bg-green-100 rounded"></div>}>
              Welcome Email
            </NavItem>
            <NavItem href="#" icon={<div className="w-4 h-4 bg-purple-100 rounded"></div>}>
              Promotional
            </NavItem>
          </div>
        </div>
      </nav>
    </>
  )

  return (
    <>
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
    </>
  )
}
