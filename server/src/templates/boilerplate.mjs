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


const Mini = [
  {
    title: "Welcome Onboard",
    description: "General onboarding welcome email",
    categoryId: "Onboarding",
    htmlContent: `
      <div style="max-width:600px; margin:0 auto; font-family:Arial,sans-serif;">
        <h2 style="color:#1f2937;">Welcome Aboard!</h2>
        <p style="color:#555;">We’re delighted to have you join us. This is the start of an exciting journey together.</p>
        <p style="color:#555;">Stay tuned for resources, guidance, and updates to help you succeed.</p>
        <p style="text-align:center; margin-top:20px;">
          <a href="#" style="background:#3b82f6; color:white; padding:10px 20px; text-decoration:none; border-radius:4px;">Get Started</a>
        </p>
      </div>
    `,
    tags: ["welcome", "onboarding"],
  },
  {
    title: "New Member Welcome",
    description: "Welcome new community or club members",
    categoryId: "Membership",
    htmlContent: `
      <div style="max-width:600px; margin:0 auto; font-family:Arial,sans-serif; text-align:center;">
        <h2 style="color:#1f2937;">Welcome to the Community</h2>
        <p style="color:#555;">You’re officially part of our growing family of members.</p>
        <p style="color:#555;">Engage, share, and explore all that we have to offer.</p>
        <p style="color:#9ca3af; font-size:14px;">We can’t wait to see you thrive here.</p>
      </div>
    `,
    tags: ["welcome", "member", "community"],
  },
  {
    title: "Internship Welcome",
    description: "Welcome message for new interns",
    categoryId: "Internship",
    htmlContent: `
      <div style="max-width:600px; margin:0 auto; font-family:Arial,sans-serif;">
        <h2 style="color:#1f2937;">Welcome, Intern!</h2>
        <p style="color:#555;">Congratulations on joining our internship program.</p>
        <p style="color:#555;">This will be a time to learn, contribute, and grow alongside professionals in your field.</p>
        <p style="color:#9ca3af; font-size:14px;">We’re excited to mentor and support you throughout this journey.</p>
      </div>
    `,
    tags: ["welcome", "internship", "career"],
  },
  {
    title: "Employee Welcome",
    description: "Welcome email for new employees",
    categoryId: "HR",
    htmlContent: `
      <div style="max-width:600px; margin:0 auto; font-family:Arial,sans-serif;">
        <h2 style="color:#1f2937;">Welcome to the Team</h2>
        <p style="color:#555;">We’re thrilled to have you as part of our company.</p>
        <p style="color:#555;">Your skills, passion, and ideas will help us shape the future together.</p>
        <p style="color:#9ca3af; font-size:14px;">Looking forward to achieving great things with you.</p>
      </div>
    `,
    tags: ["welcome", "employee", "team"],
  },
  {
    title: "Client Welcome",
    description: "Welcome email for new clients or customers",
    categoryId: "Client",
    htmlContent: `
      <div style="max-width:600px; margin:0 auto; font-family:Arial,sans-serif; text-align:center;">
        <h2 style="color:#1f2937;">Welcome to Our Services</h2>
        <p style="color:#555;">Thank you for choosing us. We’re committed to delivering the best solutions tailored to your needs.</p>
        <p style="color:#555;">Our team will be in touch to guide you through the first steps.</p>
        <p style="color:#9ca3af; font-size:14px;">We’re honored to start this partnership with you.</p>
      </div>
    `,
    tags: ["welcome", "client", "customer"],
  },
  {
    title: "Student Welcome",
    description: "Welcome email for students joining a course or program",
    categoryId: "Education",
    htmlContent: `
      <div style="max-width:600px; margin:0 auto; font-family:Arial,sans-serif;">
        <h2 style="color:#1f2937;">Welcome to the Program</h2>
        <p style="color:#555;">We’re excited to have you join our learning community.</p>
        <p style="color:#555;">This program will provide you with resources, mentorship, and opportunities to grow academically and personally.</p>
        <p style="color:#9ca3af; font-size:14px;">Let’s begin this journey of knowledge together.</p>
      </div>
    `,
    tags: ["welcome", "student", "education"],
  },
];

const welcomeTemplates = [
  {
    title: "Welcome Onboard",
    description: "Stylish onboarding welcome email",
    categoryId: "Onboarding",
    htmlContent: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#f9fafb;">
        <header style="background:#3b82f6;color:white;padding:30px;text-align:center;">
          <h1 style="margin:0;font-size:24px;">Welcome Aboard!</h1>
        </header>
        <div style="padding:30px;background:white;">
          <p style="color:#555;">We’re excited to have you with us. This marks the beginning of something amazing.</p>
          <p style="color:#555;">Explore our resources and get started with confidence.</p>
          <div style="text-align:center;margin-top:20px;">
            <a href="#" style="background:#3b82f6;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;">Get Started</a>
          </div>
        </div>
      </div>
    `,
    tags: ["welcome", "onboarding"],
  },
  {
    title: "New Member Welcome",
    description: "Warm welcome for new members",
    categoryId: "Membership",
    htmlContent: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#f1f5f9;">
        <div style="padding:40px;background:white;border-radius:8px;text-align:center;">
          <h2 style="color:#1f2937;">Welcome to the Community</h2>
          <p style="color:#6b7280;">You’re officially part of our family! Engage, share, and make the most of your membership.</p>
          <div style="margin-top:20px;">
            <a href="#" style="background:#10b981;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;">Explore Now</a>
          </div>
        </div>
      </div>
    `,
    tags: ["welcome", "member", "community"],
  },
  {
    title: "Internship Welcome",
    description: "Stylish welcome for interns",
    categoryId: "Internship",
    htmlContent: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#fff7ed;">
        <header style="background:#f97316;color:white;padding:25px;text-align:center;">
          <h1 style="margin:0;">Welcome, Intern!</h1>
        </header>
        <div style="padding:30px;">
          <p style="color:#444;">Congratulations on joining our internship program. This is your opportunity to learn, grow, and make an impact.</p>
          <p style="color:#444;">We can’t wait to see your contributions!</p>
        </div>
      </div>
    `,
    tags: ["welcome", "internship", "career"],
  },
  {
    title: "Employee Welcome",
    description: "Modern welcome for new employees",
    categoryId: "HR",
    htmlContent: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;">
        <div style="background:linear-gradient(135deg,#6366f1,#3b82f6);padding:30px;text-align:center;color:white;">
          <h1 style="margin:0;">Welcome to the Team</h1>
        </div>
        <div style="padding:30px;background:white;">
          <p style="color:#555;">We’re thrilled to have you join our company. Your skills and ideas will help us achieve great things together.</p>
          <p style="color:#555;">Let’s make this journey a rewarding one!</p>
        </div>
      </div>
    `,
    tags: ["welcome", "employee", "team"],
  },
  {
    title: "Client Welcome",
    description: "Professional client welcome email",
    categoryId: "Client",
    htmlContent: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#eef2ff;">
        <div style="background:white;padding:40px;border-radius:8px;text-align:center;">
          <h2 style="color:#1e3a8a;">Welcome to Our Services</h2>
          <p style="color:#4b5563;">Thank you for trusting us. We’re committed to delivering top-quality solutions tailored to your needs.</p>
          <div style="margin-top:20px;">
            <a href="#" style="background:#1e3a8a;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;">View Dashboard</a>
          </div>
        </div>
      </div>
    `,
    tags: ["welcome", "client", "customer"],
  },
  {
    title: "Student Welcome",
    description: "Engaging welcome for students",
    categoryId: "Education",
    htmlContent: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;">
        <header style="background:#16a34a;color:white;padding:30px;text-align:center;">
          <h1 style="margin:0;">Welcome to the Program</h1>
        </header>
        <div style="padding:30px;background:white;">
          <p style="color:#444;">We’re excited to have you join our learning community. Here you’ll find guidance, mentorship, and resources to excel.</p>
          <p style="color:#444;">Let’s begin this journey of knowledge together.</p>
          <p style="text-align:center;margin-top:20px;">
            <a href="#" style="background:#16a34a;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;">Start Learning</a>
          </p>
        </div>
      </div>
    `,
    tags: ["welcome", "student", "education"],
  },
  {
    title: "contribution Thank You",
    description: "Thank you email for contributions",
    categoryId: "Education",
    htmlContent: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <div style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); padding: 40px 20px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 32px;">Thank You!</h1>
    <p style="color: #e0e7ff; margin: 15px 0 0 0; font-size: 18px;">Your contribution makes a difference</p>
  </div>
  
  <div style="padding: 40px 20px; background: white;">
    <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
      Dear [Recipient Name],
    </p>
    
    <p style="color: #6b7280; line-height: 1.6; margin-bottom: 30px;">
      I wanted to take a moment to express my sincere appreciation for [specific contribution/action]. Your [dedication/expertise/support] has been instrumental in [specific outcome/achievement].
    </p>

    <p style="color: #6b7280; line-height: 1.6; margin-bottom: 30px;">
      Your professionalism and commitment to excellence continue to inspire the entire team. Thank you for going above and beyond to ensure our success.
    </p>

    <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
      I look forward to continuing our collaboration and achieving even greater success together.
    </p>

    <p style="color: #6b7280; line-height: 1.6;">
      With gratitude,<br>
      [Your Name]<br>
      [Your Title]
    </p>
  </div>
  
  <footer style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
    <p style="color: #9ca3af; margin: 0; font-size: 14px;">
      [Company Name] • [Address] • [Contact Information]
    </p>
  </footer>
</div>
    `,
    tags: ["welcome", "student", "education"],
  },
];


const id = '15827a3d-a9ee-445d-ac4d-a868ed9af4bf'

function seedWelcomeTemplates() {
  welcomeTemplates.forEach(async (template) => {
    template.categoryId = id;
    let createdTemplate = await prisma.emailTemplates.create({
      data: template,
    });
    console.log(`Created welcome template with ID: ${createdTemplate.id}`);
  });
}
function seedTemplates() {
  emailTemplates.forEach(async (template) => {
    template.categoryId = id;
    let createdTemplate = await prisma.emailTemplates.create({
      data: template,
    });
    console.log(`Created template with ID: ${createdTemplate.id}`);
  });
}


seedWelcomeTemplates();
// seedTemplates();

