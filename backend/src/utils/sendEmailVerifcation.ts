import { User } from '@prisma/client';
import { Request } from 'express';
import env from './validateEnv';
import {createTransport} from 'nodemailer'
import { join } from 'path';
import { readFileSync } from 'fs';
async function sendVerificationEmail(user:User, verificationToken: string,request: Request) {
    const transporter = createTransport({
        service: "SendinBlue", 
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
          user: "abdoowizli@gmail.com",
          pass: env.SENDINBLUE_PASSWORD,
        },
      });
    const verificationURL = `http://${request.headers.host}/api/users/verify?token=${verificationToken}`;

    const filePath = join(__dirname, './pages/', 'mail.html');
    let htmlContent = readFileSync(filePath, 'utf8');
    htmlContent = htmlContent.replace(/{URL}/g, verificationURL);
    console.log(htmlContent)
    const mailOptions = {
        from: 'no-reply@yourdomain.com',
        to: user.email,
        subject: 'Email Verification',
        html: htmlContent,
      };
    await transporter.sendMail(mailOptions);
}
export default sendVerificationEmail;