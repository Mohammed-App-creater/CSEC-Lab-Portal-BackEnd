import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface RegistrationEmailParams {
  to: string;
  division: string;
  group: string;
  password: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendRegistrationEmail = async ({
  to,
  division,
  group,
  password,
}: RegistrationEmailParams): Promise<void> => {
  const mailOptions = {
    from: `"Your Club Name" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🎉 Welcome to Your Club Name! Let’s Get Started",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hi ${to},</h2>
        <p>Congratulations and welcome to the <strong>Your Club Name</strong> team! 🎉</p>
        <p>You’ve been officially invited to join the <strong>${division}</strong> division, under the <strong>${group}</strong> group.</p>

        <p>Your account has been created. Here are your login details:</p>
        <ul>
          <li><strong>Email:</strong> ${to}</li>
          <li><strong>Temporary Password:</strong> ${password}</li>
        </ul>

        <p>👉 <a href="https://your-club-site.com/login" style="color: #1a73e8;">Click here to log in</a></p>

        <p>Please log in using the above credentials and make sure to update your profile and change your password as soon as possible.</p>

        <p>We’re excited to have you on board. Get ready to collaborate, grow, and make an impact with us!</p>

        <p>If you have any questions, feel free to reach out.</p>

        <p>Welcome aboard! 🚀</p>

        <br />
        <p>— Your Club Name Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
