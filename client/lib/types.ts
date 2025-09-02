import type React from "react"
export interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
}

export interface EmailData {
  to: string
  subject: string
  htmlBody: string
}

export interface LoginData {
  email: string
  password: string
}

export interface SignupData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ProfileData {
  name: string
  email: string
  bio: string
  company: string
}

export type ViewType = "login" | "signup" | "composer" | "profile"
