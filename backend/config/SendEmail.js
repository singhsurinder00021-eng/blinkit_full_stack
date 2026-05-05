import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", 
      to: sendTo,                  
      subject: subject,            
      html: html                    
    });

    if (error) {
      console.error("EMAIL ERROR:", error);
      return null;
    }

    console.log("EMAIL SENT:", data);
    return data;

  } catch (error) {
    console.error("CATCH ERROR:", error);
    return null;
  }
};

export default sendEmail;