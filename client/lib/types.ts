import type React from "react";
export interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

export interface EmailData {
  to: string[];
  subject: string;
  body: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileData {
  name: string;
  email: string;
  username: string;
  profile: string;
  id: string;
}
export interface DraftData {
  to: string[];
  subject: string;
  body: string;
}

export interface TemplateData {
  id?: string;
  title: string;
  description: string;
  categoryId: string;
  htmlContent: string;
  isFavorite?: boolean;
  tags: string[];
}
export interface favouriteData {
  id?: string;
  title: string;
  description: string;
  categoryId: string;
  htmlContent: string;
  tags: string[];
}


export interface CategoryData {
  id?: string;
  name: string;
}
export type ViewType = "login" | "signup" | "composer" | "profile";
export interface Draft {
  id: string;
  to: string[];
  subject: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

