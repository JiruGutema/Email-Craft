import { Send } from "lucide-react"
import { NavItem } from "@/components/nav-item"

export function ComposerSidebar() {
  return (
    <div className="w-64 border-r bg-white flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold">Email Composer</h1>
      </div>

      <nav className="space-y-1 px-2 flex-1">
        <NavItem href="#" icon={<Send className="h-4 w-4" />} active>
          Compose
        </NavItem>
        <NavItem
          href="#"
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
        >
          Drafts
        </NavItem>
        <NavItem
          href="#"
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        >
          Sent
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
    </div>
  )
}
