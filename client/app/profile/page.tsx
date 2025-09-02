import { ProfileSidebar } from "@/components/profile/profile-sidebar"
import { ComposerHeader } from "@/components/email/composer-header"
import { ProfileContent } from "@/components/profile/profile-content"

export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-white">
      <ProfileSidebar
        onBack={() => {
          window.location.href = "/composer"
        }}
      />

      <div className="flex-1">
        <ComposerHeader
          onProfileClick={() => {
            // Already on profile page
          }}
          onBack={() => {
            window.location.href = "/composer"
          }}
        />

        <ProfileContent />
      </div>
    </div>
  )
}
