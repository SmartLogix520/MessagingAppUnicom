const nodemailer = require("nodemailer");

// Get this from the nodemailer website https://nodemailer.com/
const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com", // Mailtrap testing 
  port: 465 , // Secure
  secure: true,
  auth: {
    user: "monemail@yahoo.com",
    pass: "mon mot de passe",
  },
});

// Same here, you can get it from the nodemailer website
async function main(mailInfos) {
 
  const info = await transporter.sendMail({
    from: mailInfos?.from,
    to: mailInfos?.to, 
    subject: mailInfos?.subject, 
    text: mailInfos?.text, 
    html: mailInfos?.html 
  });

  console.log("Message sent: %s", info.messageId);
  return;
}


module.exports = main

