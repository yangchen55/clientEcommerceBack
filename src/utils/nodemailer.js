// Use at least Nodemailer v4.1.0
import nodemailer from "nodemailer";

// configure and sent email
export const sendEmail = async (emailBody) => {
  try {
    //config
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //send email
    const info = await transporter.sendMail(emailBody);
    const link = nodemailer.getTestMessageUrl(info);
    return link
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

// make email template and data ready
export const newAccountEmailVerificationEmail = (link, obj) => {
  const emailBody = {
    from: `"FEMINAL FASHION", <${obj.email}>`,
    to: obj.email,
    subject: "Verify your email",
    text: "Plase follow the link to verify your account " + link,
    html: `
        <p>
            Hi ${obj.fName}
        </p>
        <br />    
        <p>
          Please follow the link below to verify your new account
        </p>
        <br >
<p>
                Hi <a href= ${link} > ${link} </a>
    </p>
    <br >
    <p>
    Regards, 
    <br>
   Coding Shop customer care team
</p>
        `,
  };


  return sendEmail(emailBody);
};

// email verified notification
export const emailVerifiedNotification = ({ fName, email }) => {
  const emailBody = {
    from: `"Coding Shop", <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Account verified",
    text: "Your account has been verified. You may login now",
    html: `
        <p>
            Hi ${fName}
        </p>
        <br />
        
        <p>
        Your account has been verified. You may login now
        </p>
        <br >
<p>
               <a href= "${process.env.FRONTEND_ROOT_URL}" style="background:green; color: white; padding:1rem 2.5px"> Login </a>
    </p>
    <br >
    <p>
    Regards, 
    <br>
   Coding Shop customer care team
</p>
        `,
  };

  return sendEmail(emailBody);
};

// email otp
export const emailOtp = ({ token, email }) => {
  const emailBody = {
    from: `"Coding Shop", <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "OPT for password reset",
    text: "Use the following otp to reset your password " + token,
    html: `
        <p>
            Hi there,
        </p>
        <br />
        
        <p>
        Here is your opt to reset your password
        </p>
        <br >
<p>
               ${token}
    </p>
    <br >
    <p>
    Regards, 
    <br>
   Coding Shop customer care team
</p>
        `,
  };

  sendEmail(emailBody);
};

// password update notification
export const passwordUpdateNotification = ({ fName, email }) => {
  const emailBody = {
    from: `"Coding Shop", <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your password has been updaetd",
    text: "Just to notify that you password has been just updated, if this wasn't you, conact us asap or change your password. ",
    html: `
        <p>
            Hi ${fName},
        </p>
        <br />
        
        <p>
        Just to notify that you password has been just updated, if this wasn't you, conact us asap or change your password.
        </p>
        <br >
 
    <br >
    <p>
    Regards, 
    <br>
   Coding Shop customer care team
</p>
        `,
  };

  sendEmail(emailBody);
};
