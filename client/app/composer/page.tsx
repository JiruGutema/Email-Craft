import { ComposerSidebar } from "@/components/email/composer-sidebar"
import { ComposerHeader } from "@/components/email/composer-header"
import { ComposerForm } from "@/components/email/composer-form"

export default function ComposerPage() {
  return (
    <div className="flex h-screen bg-white">
      <ComposerSidebar />

      <div className="flex-1">
        <ComposerHeader
          onProfileClick={() => {
            window.location.href = "/profile"
          }}
        />

        <div className="p-6">
          <ComposerForm />
        </div>
      </div>
    </div>
  )
}
