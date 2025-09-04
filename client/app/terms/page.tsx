import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className=" bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <Button
                variant="outline"
                className="text-muted-foreground hover:text-foreground gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className=" mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="border border-border  shadow-lg p-6 bg-transparent max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-3 text-primary text-center tracking-tight">
            Terms of Service & Privacy Policy
          </h1>
          <p className="text-xs text-muted-foreground mb-6 text-center">
            Last updated: September 4, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2 text-accent">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm mb-2">
              By accessing or using Mail Craft, you agree to be bound by these
              Terms of Service and our Privacy Policy. If you do not agree with
              any part of these terms, you may not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2 text-accent">
              2. Service Description
            </h2>
            <p className="text-sm mb-2">
              Our platform is designed to help you send styled and polished
              messages using HTML and CSS, ensuring your emails look
              professional and visually appealing. Mail Craft provides a
              built-in HTML editor with live preview features, allowing you to
              work seamlessly with HTML and CSS for rich formatting and
              beautiful presentation. <br /> <br />
              <p>
                We do not focus on sending plain text emails; instead, we offer
                tools for enhanced email composition. We act as a facilitator,
                sending emails on your behalf using your access token (which is
                stored securely in the database). we store only drafts securely
                for your convenience. we don't store you send emails.
              </p>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2 text-accent">
              3. User Accounts & Authentication
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                    By using our service, you agree that we use OAuth to authenticate your account and that we store your access token securely in our database to facilitate email sending on your behalf.
                </li>
              <li>
                Users must authenticate via OAuth with a supported provider to
                access the full features of Mail Craft.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials and access tokens.
              </li>
              <li>
                Unauthorized use of another user's account is strictly
                prohibited.
              </li>
              <li>
                you can revoke our access to your email account at any time via your email provider's security settings.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2 text-accent">
              4. Email Sending & Drafts
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                When you send an email, Mail Craft uses your access token to
                send the email directly from your account. We do store only access token to send email and we do not 
                share your access token with third parties.
              </li>
              <li>
                Drafts are stored securely and are only accessible to your
                authenticated account. You may edit or delete your drafts at any
                time.
              </li>
              <li>
                We do not access or use your email content for any purpose other
                than providing the service.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2 text-accent">
              5. Acceptable Use Policy
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                You agree not to use Mail Craft for any unlawful, harmful,
                fraudulent, or abusive activity, including but not limited to
                sending spam, phishing, or harassing content.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that
                violate these terms or applicable laws.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2 text-accent">
              6. Privacy Policy
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                We collect only the information necessary to provide our
                service, such as your email address, profile information, and
                email drafts.
              </li>
              <li>
                Your OAuth access token is used solely to authenticate your
                account and send emails on your behalf. It is stored securely
                and never shared with third parties.
              </li>
              <li>
                Email drafts are stored securely and are only accessible to your
                authenticated account. You may delete your drafts at any time.
              </li>
              <li>
                We do not sell, rent, or share your personal information with
                third parties except as required to provide the service or
                comply with the law.
              </li>
              <li>
                Mail Craft may integrate with third-party email providers for
                OAuth authentication and email delivery. We do not share your
                personal information with these providers beyond what is
                necessary for authentication and email sending.
              </li>
              <li>
                We implement reasonable security measures to protect your data.
                However, no method of transmission or storage is 100% secure.
              </li>
              <li>
                You may request deletion of your account and associated data at
                any time by contacting support.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2 text-accent">
              7. Service Availability & Changes
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                We strive to provide reliable service but do not guarantee
                uninterrupted access or error-free operation.
              </li>
              <li>
                We reserve the right to modify, suspend, or discontinue the
                service at any time, with or without notice.
              </li>
              <li>
                We may update these terms and policies from time to time.
                Changes will be posted on this page and are effective
                immediately upon posting.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2 text-accent">8. Contact</h2>
            <p className="text-sm">
              If you have any questions or concerns about these terms or your
              privacy, please contact us at{" "}
              <a
                href="mailto:jirudagutema@gmail.com"
                className="underline text-primary font-semibold"
              >
                jirudagutema@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src={'./images/logo.png'} className="h-6 w-6 text-accent" />
              <span className="text-lg font-semibold">Email Craft</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Professional email composition made simple and beautiful.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
