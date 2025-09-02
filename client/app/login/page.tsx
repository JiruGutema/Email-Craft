import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm
          onLogin={() => {
            // Handle login redirect
            window.location.href = "/composer"
          }}
          onSwitchToSignup={() => {
            // Handle switch to signup
            window.location.href = "/signup"
          }}
        />
      </div>
    </div>
  )
}
