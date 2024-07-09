import nodemailer from "nodemailer"
import { htmlContent } from "./emailhtml.js";

/**
 * Sends an email to the provided email address with a confirmation link.
 * @param {string} email - The recipient's email address.
 * @param {string} link - The link to be included in the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 */
export const Verify_email=async(email,link)=>{
    // Create a transporter using gmail's SMTP server
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: process.env.EMAIL, // email address of the sender
          pass: process.env.PASSWORD, // password of the sender's email account
        },
      });
      
      // Send the email
      const info = await transporter.sendMail({
        // Sender address
        from: '"Danial" <dannyraafat30@gmail.com>', 
        // list of receivers
        to: `${email}`, 
        // Subject line
        subject: "Confirm Your Email", 
         //html content of the email
        html: htmlContent(link),
        
      });
    
}
