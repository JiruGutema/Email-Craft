import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const emailTemplates = [
  {
    title: "Welcome Newsletter",
    description: "A warm welcome email for new subscribers",
    categoryId: "Newsletter",
    htmlContent: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <header style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Our Community!</h1>
        </header>
        <div style="padding: 40px 20px; background: white;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Hi there!</h2>
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
            We're thrilled to have you join our community. Get ready for exclusive content, updates, and special offers.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Get Started
            </a>
          </div>
        </div>
      </div>
    `,
    tags: ["welcome", "onboarding", "newsletter"],
  },
  {
    title: "Product Launch",
    description: "Announce your latest product with style",
    categoryId: "Promotion",
    htmlContent: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="padding: 40px 20px; background: white;">
          <h1 style="color: #1f2937; text-align: center; margin-bottom: 30px;">New Product Launch</h1>
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="/product-showcase.png" alt="Product" style="max-width: 100%; border-radius: 8px;">
          </div>
          <h2 style="color: #1f2937; margin-bottom: 20px;">Introducing Our Latest Innovation</h2>
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 30px;">
            After months of development, we're excited to share our newest product with you. Experience the future today.
          </p>
          <div style="text-align: center;">
            <a href="#" style="background: #8b5cf6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    `,
    tags: ["product", "launch", "promotion"],
  },
  {
    title: "Event Invitation",
    description: "Invite your audience to upcoming events",
    categoryId: "Event",
    htmlContent: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: #f1f5f9; padding: 40px 20px;">
          <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="color: #1f2937; text-align: center; margin-bottom: 20px;">You're Invited!</h1>
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: #8b5cf6; color: white; padding: 20px; border-radius: 8px; display: inline-block;">
                <h2 style="margin: 0; font-size: 24px;">Annual Conference 2024</h2>
                <p style="margin: 10px 0 0 0;">March 15, 2024 • 9:00 AM</p>
              </div>
            </div>
            <p style="color: #6b7280; line-height: 1.6; text-align: center; margin-bottom: 30px;">
              Join industry leaders for a day of networking, learning, and innovation.
            </p>
            <div style="text-align: center;">
              <a href="#" style="background: #1f2937; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    `,
    tags: ["event", "invitation", "conference"],
  },
  {
    title: "Monthly Report",
    description: "Professional monthly business report template",
    categoryId: "Business",
    htmlContent: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <header style="background: #1f2937; padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Monthly Report</h1>
          <p style="color: #9ca3af; margin: 10px 0 0 0;">March 2024</p>
        </header>
        <div style="padding: 40px 20px; background: white;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
            <div style="text-align: center; padding: 20px; background: #f1f5f9; border-radius: 8px;">
              <h3 style="color: #8b5cf6; margin: 0; font-size: 32px;">$125K</h3>
              <p style="color: #6b7280; margin: 5px 0 0 0;">Revenue</p>
            </div>
            <div style="text-align: center; padding: 20px; background: #f1f5f9; border-radius: 8px;">
              <h3 style="color: #8b5cf6; margin: 0; font-size: 32px;">2,340</h3>
              <p style="color: #6b7280; margin: 5px 0 0 0;">New Users</p>
            </div>
          </div>
          <p style="color: #6b7280; line-height: 1.6;">
            This month showed strong growth across all key metrics. Revenue increased by 15% compared to last month.
          </p>
        </div>
      </div>
    `,
    tags: ["business", "report", "analytics"],
  },
  {
    title: "Holiday Promotion",
    description: "Festive promotional email for holidays",
    categoryId: "Promotion",
    htmlContent: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #dc2626, #f59e0b); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 36px;">Holiday Sale</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Up to 50% Off Everything</p>
        </div>
        <div style="padding: 40px 20px; background: white;">
          <h2 style="color: #1f2937; text-align: center; margin-bottom: 20px;">Limited Time Offer</h2>
          <p style="color: #6b7280; line-height: 1.6; text-align: center; margin-bottom: 30px;">
            Don't miss out on our biggest sale of the year. Shop now and save big on all your favorite items.
          </p>
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #dc2626; color: white; padding: 20px; border-radius: 8px; display: inline-block;">
              <h3 style="margin: 0; font-size: 24px;">50% OFF</h3>
              <p style="margin: 5px 0 0 0;">Use code: HOLIDAY50</p>
            </div>
          </div>
          <div style="text-align: center;">
            <a href="#" style="background: #8b5cf6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Shop Sale
            </a>
          </div>
        </div>
      </div>
    `,
    tags: ["holiday", "sale", "promotion"],
  },
  {
    title: "Customer Survey",
    description: "Gather feedback from your customers",
    categoryId: "Survey",
    htmlContent: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="padding: 40px 20px; background: white;">
          <h1 style="color: #1f2937; text-align: center; margin-bottom: 30px;">We Value Your Feedback</h1>
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #f1f5f9; padding: 30px; border-radius: 12px;">
              <h2 style="color: #8b5cf6; margin: 0 0 15px 0;">Quick Survey</h2>
              <p style="color: #6b7280; margin: 0;">Help us improve by sharing your thoughts</p>
            </div>
          </div>
          <p style="color: #6b7280; line-height: 1.6; text-align: center; margin-bottom: 30px;">
            Your opinion matters to us. Take 2 minutes to complete our survey and help us serve you better.
          </p>
          <div style="text-align: center;">
            <a href="#" style="background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Take Survey
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 14px; text-align: center; margin-top: 20px;">
            This survey takes less than 2 minutes to complete.
          </p>
        </div>
      </div>
    `,
    tags: ["survey", "feedback", "customer"],
  },
];

function seedTemplates() {
  emailTemplates.forEach(async (template) => {
    template.categoryId = '8c78f111-1937-4f9d-889f-063157938f6a';
    let createdTemplate = await prisma.emailTemplates.create({
      data: template,
    });
    console.log(`Created template with ID: ${createdTemplate.id}`);
  });
}

seedTemplates();