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
    from: `"CSEC ASTU" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🎉 Welcome to CSEC ASTU – You're In!",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 30px; border-radius: 12px; border: 1px solid #e0e0e0;">
        <img src="https://www.google.com/imgres?q=google&imgurl=https%3A%2F%2Fyt3.googleusercontent.com%2F2eI1TjX447QZFDe6R32K0V2mjbVMKT5mIfQR-wK5bAsxttS_7qzUDS1ojoSKeSP0NuWd6sl7qQ%3Ds900-c-k-c0x00ffffff-no-rj&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fuser%2FGoogleDevelopers&docid=iIE2lzMrbJ7goM&tbnid=fmDxoTQaoqsYcM&vet=12ahUKEwjZ4_zC7--MAxWTQEEAHZ4yDtEQM3oFCIABEAA..i&w=900&h=900&hcb=2&ved=2ahUKEwjZ4_zC7--MAxWTQEEAHZ4yDtEQM3oFCIABEAA" alt="Welcome to CSEC ASTU" style="width: 100%; border-radius: 10px 10px 0 0;" />
        <div style="padding: 20px;">
          <h2 style="color: #2d2d2d;">Hi ${to},</h2>
          <p style="font-size: 16px; color: #333;">🎉 Congratulations and welcome to the <strong>CSEC ASTU</strong> family!</p>
          
          <p style="font-size: 16px; color: #333;">
            You've officially been invited to join the <strong>${division}</strong> division under the <strong>${group}</strong> group.
          </p>
  
          <p style="font-size: 16px; color: #333;">Your account has been created! Here are your login details:</p>
          <ul style="font-size: 16px; color: #333; line-height: 1.6;">
            <li><strong>Email:</strong> ${to}</li>
            <li><strong>Temporary Password:</strong> ${password}</li>
          </ul>
  
          <div style="margin: 20px 0;">
            <a href="https://csec-portal-frontend-w71k.vercel.app/login" style="display: inline-block; background-color: #1a73e8; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              🔐 Log In to Your Account
            </a>
          </div>
  
          <p style="font-size: 16px; color: #333;">Please log in and change your password as soon as possible for security reasons. Also, don’t forget to update your profile! 🛠️</p>
  
          <p style="font-size: 16px; color: #333;">We're super excited to have you onboard. Let’s collaborate, innovate, and create something amazing together! 💡✨</p>
  
          <p style="font-size: 16px; color: #333;">Need help or have questions? We’ve got your back — just reach out. 📩</p>
  
          <p style="font-size: 16px; color: #333;">Welcome to the crew! 🚀</p>
  
          <br />
          <p style="font-size: 16px; color: #555;">— The CSEC ASTU Team</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
