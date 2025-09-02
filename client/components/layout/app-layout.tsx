import type React from "react"
interface AppLayoutProps {
  sidebar: React.ReactNode
  header: React.ReactNode
  children: React.ReactNode
}

export function AppLayout({ sidebar, header, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      {sidebar}

      <div className="flex-1">
        {header}

        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
