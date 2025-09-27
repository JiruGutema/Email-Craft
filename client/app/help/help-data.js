import { Play, Mail, Code, User, Shield, Settings } from "lucide-react"
export const helpSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Play,
      description: "Learn the basics of using our email composer",
      articles: [
        {
          title: "Creating Your First Email",
          content:
            'Start by clicking the "New Email" button in the composer. Fill in the recipient, subject, and compose your message using our rich HTML editor.',
        },
        {
          title: "Understanding the Interface",
          content:
            "The interface consists of a sidebar for navigation, a header with your profile, and the main composer area where you create emails.",
        },
        {
          title: "Quick Start Guide",
          content: "Get up and running in 5 minutes with our step-by-step quick start guide.",
        },
      ],
    },
    {
      id: "email-composition",
      title: "Email Composition",
      icon: Mail,
      description: "Master the art of creating beautiful emails",
      articles: [
        {
          title: "Using the HTML Editor",
          content:
            "Our HTML editor supports rich text formatting, custom styling, and live preview. Switch between HTML and preview modes using the tabs.",
        },
        {
          title: "Adding Recipients",
          content:
            'Enter email addresses in the "To" field. You can add multiple recipients by separating them with commas.',
        },
        {
          title: "Email Templates",
          content: "Choose from pre-built templates in the sidebar to get started quickly with professional designs.",
        },
        {
          title: "Sending Emails",
          content:
            'Click the "Send Email" button to deliver your message. You\'ll see a confirmation when the email is sent successfully.',
        },
      ],
    },
    {
      id: "html-editing",
      title: "HTML Editing",
      icon: Code,
      description: "Advanced HTML editing features and tips",
      articles: [
        {
          title: "HTML Syntax Highlighting",
          content:
            "The editor provides syntax highlighting for HTML, CSS, and inline styles to help you write clean code.",
        },
        {
          title: "Live Preview",
          content:
            "See your changes in real-time with the preview tab. Switch between HTML and preview modes instantly.",
        },
        {
          title: "Custom Styling",
          content:
            "Add custom CSS styles inline or use classes. The editor supports modern CSS features and responsive design.",
        },
        {
          title: "Best Practices",
          content:
            "Follow email HTML best practices: use tables for layout, inline CSS for styling, and test across different email clients.",
        },
      ],
    },
    {
      id: "user-profiles",
      title: "User Profiles",
      icon: User,
      description: "Manage your account and profile settings",
      articles: [
        {
          title: "Editing Your Profile",
          content:
            "Click your profile picture in the header to access your profile page. Update your name, email, company, and bio.",
        },
        {
          title: "Profile Statistics",
          content: "View your email sending statistics, including emails sent today and total drafts.",
        },
        {
          title: "Account Settings",
          content: "Manage your account preferences, notification settings, and privacy options.",
        },
      ],
    },
    {
      id: "authentication",
      title: "Authentication",
      icon: Shield,
      description: "Login, signup, and security features",
      articles: [
        {
          title: "Creating an Account",
          content: "Sign up with your email and password, or use Google OAuth for quick registration.",
        },
        {
          title: "Logging In",
          content:
            "Access your account using your credentials or Google sign-in. Your session will be remembered for convenience.",
        },
        {
          title: "Password Security",
          content: "Use a strong password and enable two-factor authentication for enhanced security.",
        },
        {
          title: "Account Recovery",
          content: 'If you forget your password, use the "Forgot Password" link to reset it via email.',
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: Settings,
      description: "Common issues and solutions",
      articles: [
        {
          title: "Email Not Sending",
          content:
            "Check your internet connection, verify recipient addresses, and ensure you're logged in. Contact support if issues persist.",
        },
        {
          title: "HTML Not Rendering",
          content:
            "Validate your HTML syntax and check for unclosed tags. Use the preview mode to test your email appearance.",
        },
        {
          title: "Login Issues",
          content: "Clear your browser cache, check your credentials, and try using an incognito window.",
        },
        {
          title: "Performance Issues",
          content: "Close unnecessary browser tabs, clear cache, and ensure you have a stable internet connection.",
        },
      ],
    },
  ]

 export const faqs = [
    {
      question: "How do I create my first email?",
      answer:
        'Click the "New Email" button in the composer, fill in the recipient and subject fields, then use our HTML editor to compose your message. You can switch between HTML editing and preview modes.',
    },
    {
      question: "Can I use custom HTML and CSS?",
      answer:
        "Yes! Our editor supports full HTML and CSS customization. You can write custom styles inline or use CSS classes for advanced formatting.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use industry-standard encryption and security practices to protect your data. Your emails and personal information are never shared with third parties.",
    },
    {
      question: "How do I reset my password?",
      answer:
        'Click the "Forgot Password" link on the login page and enter your email address. You\'ll receive a password reset link via email.',
    },
    {
      question: "Can I collaborate with team members?",
      answer:
        "Currently, the platform is designed for individual use. Team collaboration features are planned for future releases.",
    },
    {
      question: "What email formats are supported?",
      answer:
        "We support HTML emails with full CSS styling. Plain text emails are also supported for simpler communications.",
    },
  ]