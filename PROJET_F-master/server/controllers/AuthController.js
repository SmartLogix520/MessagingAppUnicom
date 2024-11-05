// Récupérer le modèle
const User = require("../models/User");
// Permet de chiffrer le mot de passe avant l'enrgistrement dans la base de données
const bcrypt = require("bcrypt");
// Json Web Token
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const otpGenerator = require('otp-generator');
const UserOTPVerification = require("../models/OTPmodel");


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


/* register to application */
const Register = async (req, res) => {
  try {
    console.log("hellooo")
    // Vérifier si un utilisateur avec le même nom d'utilisateur ou la même adresse e-mail existe déjà
    const existingUser = await User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email }
      ]
    });  

    if (existingUser) {
      console.log("user exist")
      return res.status(400).json({ message: 'A user with the same username or email address already exists.' });
    }

    // Créer un nouvel utilisateur s'il n'existe pas déjà
    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
/* Create a session using SESSIONS */




const Login = async (req, res, next) => {
  try {

    // get email and hashed password
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email , deleted:false }).lean();

    if (!user) {
      res.status(401).json({ error: "User does not exist" });
    } else {

      const passwordMatch = await bcrypt.compare(password, user.password);
      // bcrypt.compare(password, user.password, function (err, result) {
        if (passwordMatch) {
          try {
                           await Send2FAEmail(req, res);
                           console.log("looo",user.email)
                         
                          
                           } catch (error) {
                            console.error("Error sending 2FA email:", error);
                   // Handle the error as needed
                          }
        }
        // Incorrect password
        else res.status(403).json({ error: "Mot de passe incorrect" });
      }
     
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur inconnue" });
  }
};




// const Login = async (req, res, next) => {
//   try {

//     // get email and hashed password
//     let email = req.body.email;
//     let password = req.body.password;

//     const user = await User.findOne({ email }).lean();

//     if (!user) {
//       res.status(401).json({ error: "User does not exist" });
//     } else {
//       bcrypt.compare(password, user.password, function (err, result) {
//         if (result) {
//           req.session.regenerate(function (err) {
//             if (err) next(err);
//             // Save user in session to
//             req.session.user = user;
//             // Send the cookie to the server
//             res.send({_id : user._id, email: user.email});
//             // Save session
//             req.session.save( async function (err) {
//               if (err) return
//               next(err);
//                // Call the Send2FAEmail function here
//                try {
//                 await Send2FAEmail(req, res);
//                 console.log('Email envoyer')
              
//               } catch (error) {
//                 console.error("Error sending 2FA email:", error);
//                 // Handle the error as needed
//               }
//             }
//             );
            
//    //Fonction de envoiOTOEmail
   

//           });
//         }
//         // Incorrect password
//         else res.status(403).json({ error: "Mot de passe incorrect" });
//       });
//     } 
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Erreur inconnue" });
//   }
// };

// Logout
// const Logout = async (req, res) => {
//   if (req.session) {
//     req.session.user = null;
//     req.session.destroy();
//     res.clearCookie('connect.sid', { path: '/' });
//     console.log("clear session")
//     res.status(200).json({
//       success: true,
//       message: 'Logged out',
//     });
//   } else {
//     res.status(500).json({
//       success: false,
//       message: 'Session not found',
//     });
//   }
// };
const Logout = async (req, res) => {
  try {
    if (req.session) {
      req.session.user = null;
      req.session.destroy();
      res.clearCookie('connect.sid', { path: '/' });
      console.log("session effacée");
      res.status(200).json({
        success: true,
        message: 'Déconnecté',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Session introuvable',
      });
    }
  } catch (error) {
    console.error("Erreur de déconnexion :", error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
    });
  }
};
//gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
const Send2FAEmail = async (req, res) => {
  const { email } = req.body;
 
try{
  console.log("try")

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
      const user = await User.findOne({ email });
     console.log("user",user)

      if (!user) {
          return res.status(404).json({ message: 'Ladresse email nappartient à aucun utilisateur' });
      }
      // Générer un code OTP
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      const saltRounds = 10;
     const hashedOTP = await bcrypt.hash(otp , saltRounds);

     await UserOTPVerification.deleteMany({email});

     const newOTPVerification = new UserOTPVerification({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiredAt: Date.now() +300000,
        
     });
      console.log("orttp",otp)

      // Récupération de l'e-mail de confiance de l'utilisateur
      const trustedemail = user.trustedemail;
      console.log("trustedmail" ,trustedemail)

      // Définition des options de l'e-mail
      const mailOptions = {
        from: 'yacinecherifi032@gmail.com',
        to: trustedemail,
        subject: 'Your Two-Factor Authentication OTP',
        text: `Dear ${user.username},

        Thank you for using our secure two-factor authentication system. Your One-Time Password (OTP) for authentication is:
        
        ${otp}
        
        This OTP is valid for a short period. Please do not share it with anyone. If you did not request this OTP, please ignore this email.
        
        Thank you for keeping your account secure.
        
        Best regards,
        Unicom  `
      };

   // Enregistrement du code OTP dans la base de données

     await newOTPVerification.save();

    

      // Envoi de l'e-mail
      const info = await transporter.sendMail(mailOptions);
      console.log("envoi du mail")
  
     res.status(200).json({_id : user._id, email: user.email, username: user.username})
     console.log(req.session.user.username)
  }catch{ 
  //  res.status(400).json({ message: 'Envoi du mail otp a echoue' });

  }
};


const verifyOTP2FA = async (req,res,next)=>{
 
  try {
    let{ email, otp}  = req.body;
    const user = await User.findOne({ email }).lean();

    if (!email || !otp ){ throw Error("Empty otp details are not allowed");

  }else{
    const UserOTPVerificationRecords = await UserOTPVerification.find({
      email,
    });
    
    if (req.session) {
      req.session.regenerate(function (err) {
        if (err) next(err);
        req.session.user = user;
        req.session.save();
        console.log(req.session);
      });
    } else {
      console.error("La session n'existe pas.");
      // Gérer l'erreur ou rediriger l'utilisateur vers une page appropriée.
    }
   
    if(UserOTPVerificationRecords.length <= 0){
      throw new Error("account record doesn't exist or has been verified already pls login ");
  }else {
     //user otp record exist
     const expiredAt=  UserOTPVerificationRecords[0].expiredAt
     ;
     const hashedOTP = UserOTPVerificationRecords[0].otp;
    

     if (expiredAt < Date.now()){
     console.log("exprise oooppoppopqq",expiredAt,Date.now())

      //user otp record has expired
      await UserOTPVerification.deleteMany({email});
      throw new Error("Code has expired.Please request again");
    } else {
      const validOTP = await bcrypt.compare(otp , hashedOTP);
      if (!validOTP){
        //supplied otp is wrong
         throw new Error("Invalid code passed.chek your inbox.");
      } else {


    //     if (req.session) {
    //   req.session.regenerate(function (err) {
    //     if (err) next(err);
    //     req.session.user = user;
    //     req.session.save();
    //     console.log(req.session.user.username);
    //   });
    // } else {
    //   console.error("La session n'existe pas.");
    //   // Gérer l'erreur ou rediriger l'utilisateur vers une page appropriée.
    // }




        // console.log("hswgdhj")
        
        //   req.session.regenerate(function (err) {
        //     if (err) next(err);
        //     req.session.user = user;
        //     console.log("sgdhj")
        //     req.session.save()
        

        //   });
        
          await UserOTPVerification.deleteMany({email});

      }
      
       
    }
  }
  }
  res.status(200).json({_id : user._id, email: user.email, username : user.username});
    
  } catch (error) {
     res.json({
      status:"FAILED",
      message: error.message,
     });
  }
  
  }


 
module.exports = { Register, Send2FAEmail,verifyOTP2FA  ,Login, Logout };