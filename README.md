# Mail Styler

This project is a **NestJS** application that provides authentication and authorization using Google OAuth, and allows users to send html styled and custom emails directly from their Gmail account via a web interface. It uses **Prisma** for database management and supports both plain text and HTML emails.

## Features

- **Google OAuth Authentication:** Users can log in with their Google account.
- **JWT Authorization:** Secure API endpoints with JWT tokens.
- **Send Email via Gmail API:** Authenticated users can send emails from their own Gmail account.
- **Refresh Token Handling:** Automatically refreshes expired access tokens using the stored refresh token.
- **Prisma ORM:** User and token management in a PostgreSQL database.
- **HTML & Text Email Support:** Send rich HTML or plain text emails.
- **Guards:** Custom guards for authentication and email sending permissions.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- Google Cloud OAuth credentials

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/jirugutema/Mail-Styler.git
   cd Mail-Styler
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the project root:

   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   ```

4. **Set up Prisma:**
   ```sh
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the server:**
   ```sh
   npm run start:dev
   ```

## Usage

### Authentication

- Visit `/auth/google` to log in with your Google account.
- After authentication, you will receive a JWT token for API access.

### Sending Email

- Send a POST request to `/mail/send` with your JWT token in the `Authorization` header.
- Request body example (JSON):

  ```json
  {
    "to": "recipient@example.com",
    "subject": "Hello from NestJS!",
    "text": "This is a plain text email.",
    "html": "<h1>This is an HTML email!</h1><p>Sent from NestJS Gmail Web Mailer.</p>"
  }
  ```

### Token Refresh

- If your access token expires, the service will automatically refresh it using your stored Google refresh token.

## Project Structure

```
src/
  auth/         # Authentication logic, Google OAuth, JWT, guards
  mail/         # Email sending logic, guards, controller, service
  users/        # User management
  prisma/       # Prisma schema
  ...
```

## Troubleshooting

- **No refresh token:** Make sure you use `accessType: 'offline'` and `prompt: 'consent'` in your Google OAuth strategy, and users revoke access before re-authenticating if needed.
- **Insufficient scopes:** Add `'https://www.googleapis.com/auth/gmail.send'` to your OAuth scopes.
- **Database errors:** Ensure your Prisma schema matches your code and run migrations.

## License