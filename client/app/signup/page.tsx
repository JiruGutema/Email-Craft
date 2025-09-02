import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignupForm
          onSignup={() => {
            // Handle signup redirect
            window.location.href = "/composer"
          }}
          onSwitchToLogin={() => {
            // Handle switch to login
            window.location.href = "/login"
          }}
        />
      </div>
    </div>
  )
}
