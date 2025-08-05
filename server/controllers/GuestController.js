const mongoose = require("mongoose");
const Guest = require("../models/Guest");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');



// OAuth2_Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN2 });
const { OAuth2Client } = require('google-auth-library');
const otpGenerator = require('otp-generator');


 //Configuration du client OAuth2 pour l'envoi d'e-mails via Gmail
 const OAuth2_Client = new OAuth2Client({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
   });
 
  OAuth2_Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN2 });
 
 // // Récupération du jeton d'accès OAuth2
 const getAccessToken = async () => {
   try {
     const accessToken = await OAuth2_Client.getAccessToken();
  
     return accessToken;
     
   } catch (error) {
     console.error(error);
   }
 };
 
 getAccessToken();
 let compteUtilisateur = '';
const SendResetEmail = async (req, res) => {
  const { email } = req.body;
  compteUtilisateur = email;
 

  try {
    const accessToken = await getAccessToken();

    // Création du transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          type: 'OAuth2',
          user: 'yacinecherifi032@gmail.com',
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN2,
          accessToken: accessToken
      }
    });

      // Vérification de l'existence de l'utilisateur avec l'e-mail fourni
      const user = await User.findOne({ email:email });
     

      if (!user) {
          return res.status(404).json({ message: 'Ladresse email nappartient à aucun utilisateur' });
      }
      // Générer un code OTP
      const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
      console.log(otp)

      // Récupération de l'e-mail de confiance de l'utilisateur
      const trustedemail = user.trustedemail;
      console.log(trustedemail)

      // Définition des options de l'e-mail
      const mailOptions = {
        from: 'yacinecherifi032@gmail.com',
        to: trustedemail,
        subject: 'Password Reset OTP',
        text: `Dear ${user.username},


        

        We received a request to reset your password. To complete the process, please use the following One-Time Password (OTP):

        ${otp}

        If you did not request a password reset, please ignore this email. Your account security is important to us.

           Best regards,
       Unicom  `
      };
      // Envoi de l'e-mail
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail envoyé: ' + info.response);
      
       // Mise à jour du code OTP dans la base de données
      user.rtoken = otp;
      await user.save();

      transporter.close();

     //Results
   res.status(200).json({ message: 'Envoi du mail de réinitialisation réussi' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur denvoi du mail de réinitialisation' });
  } finally {
      // transporter.close();
  }
};
const verifyOtp = async (req, res) => {
    const { enteredOtp } = req.body;
  console.log("Je suis ici ")
    try {
      // Recherche de l'utilisateur en fonction du code OTP
      const user = await User.findOne({ rtoken: enteredOtp });
  console.log("user")
      if (!user) {
        return res.status(401).json({ message: 'Code OTP incorrect.' });
      }
  
      // Réinitialiser le code OTP dans la base de données après vérification
      user.rtoken = null;
      await user.save();
      
  
      return res.status(200).json({ message: 'Code OTP vérifié avec succès.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la vérification du code OTP.' });
    }
  };
  const ResetPassword = async (req, res) => {
    const { newPassword,email } = req.body;
  
    try {
      const user = await User.findOne({ email:email });  // Utilisez l'e-mail stocké
      console.log(email)
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Mettez à jour le mot de passe avec le nouveau mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // user.password = hashedPassword ;
      await user.updateOne({password:hashedPassword});
      user.rtoken = null; // Vous pouvez également réinitialiser le rtoken ici si nécessaire
      await user.save();
  
      res.status(200).json({ message: 'Le mot de passe a été mis à jour avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de mise à jour du mot de passe' });
    }
  };
  
  // Exporter le module pour etre visible dans le même dossier
  module.exports = { ResetPassword, SendResetEmail, verifyOtp};
  