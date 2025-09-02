# Email Craft

**Email Craft** is a full-stack web application built with **NestJS** (backend) and **NextJS** (frontend) for composing, styling, and sending custom HTML emails directly from your Gmail account. It features secure authentication via Google OAuth, robust JWT-based authorization, and a modern HTML email editor.

The backend uses **Prisma ORM** with PostgreSQL for efficient user and token management, and integrates with the Gmail API to send both plain text and HTML emails. Automatic token refresh ensures uninterrupted access, while custom guards protect sensitive operations.

The frontend provides a rich interface with live HTML editing, syntax highlighting, and preview capabilities. Drafts are automatically cached in the browser, allowing users to resume their work at any time.

---

## ✨ Features

- **Google OAuth Authentication:** Secure login with your Google account.
- **JWT Authorization:** Protects API endpoints with JWT tokens.
- **Send Email via Gmail API:** Deliver emails from your own Gmail account.
- **Automatic Token Refresh:** Handles expired access tokens using stored refresh tokens.
- **Prisma ORM:** Manages users and tokens in a PostgreSQL database.
- **Rich HTML & Text Email Support:** Compose and send beautiful HTML or plain text emails.
- **Frontend Editor:** Live HTML editor with syntax highlighting and preview.
- **Draft Saving:** Automatically cache your email drafts in the browser.
- **Custom Guards:** Backend guards for authentication and email permissions.

---

## 🛠️ Technologies

- **NestJS** — Backend framework
- **NextJS** — Frontend framework
- **Prisma ORM** — Database management
- **PostgreSQL** — Database
- **Google OAuth & Gmail API** — Authentication and email delivery
- **JWT** — Authorization

---

## 📝 License

MIT

---

**Email Craft** makes it easy to send professional, styled emails from your Gmail account, with a secure and user-friendly interface for composing and managing your emails.