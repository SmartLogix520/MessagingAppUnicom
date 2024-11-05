

const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const ObjectID = mongoose.Types.ObjectId;
// const nodemailer = require('nodemailer');

// const bcrypt = require("bcrypt");

// const { OAuth2Client } = require('google-auth-library');
// const otpGenerator = require('otp-generator');

// // Configuration du client OAuth2 pour l'envoi d'e-mails via Gmail
// const OAuth2_Client = new OAuth2Client({
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//   });




const UpdateUser = async (req, res) => {
  try {
    const filter = { _id: new mongoose.Types.ObjectId(req.params.id) };
    const user = await User.findOne(filter);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the username is sent in the request
    if (req.body.username) {
      // Check if the new username already exists
      const usernameExists = await User.findOne({ username: req.body.username });

      // If the new username already exists and it's different from the current username
      if (usernameExists && usernameExists._id.toString() !== user._id.toString()) {
        return res.status(400).json({ success: false, message: "Username already exists" });
      } else{
         // If the new username is unique or it's the same as the current username, update it
      user.username = req.body.username;
      }

      
    }

    // Update other fields
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.gender = req.body.gender;
    user.birth_date = req.body.birth_date;
    user.phone_number = req.body.phone_number;
    user.trustedemail = req.body.trustedemail;

    // Save the updated user
    await user.save();

    res.status(200).json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
// creation de lavatar
const UpdateAvatar = async (req, res) => {
  const avatar = req.file;
  console.log("we are", avatar);
  try {
    const filter = { _id: new mongoose.Types.ObjectId(req.params.id) };
    const user = await User.findOne(filter);
    if (!user) {
      res.status(400).json({ message: "error user" });
    }

    if (avatar) {
      user.avatar = avatar?.filename;
    } else {
      user.avatar = "";
    }

    user.save();
    console.log("user", user.avatar);
    res.status(200).json({ message: "user" });
  } catch {
    res.status(400).json({ message: "error user" });
  }
};
// /* Create a session using SESSIONS */
// const UpdatePassword = async (req, res, next) => {
//   try {
//     // get email and hashed password
//     let new_password = req.body.new_password.toString();
//     let current_password = req.body.current_password.toString();
//     let email = req.session.user.email;

//     const filter = { email: email };
    
//     await User.findOne(filter).then((user) => {
//       if(!user) {
//         console.log("user not found");
//         return;
//       } else { 
//         bcrypt.compare(current_password, user.password, function (err, result) {
//           if (result) {
//             const salt = bcrypt.genSalt(10);
//             bcrypt.hash(new_password, 10).then((salt) => {
//               user.password = result
//               console.log(result)
//               return user.save() 
//             }) 
//           } 
//         }); 
//       }
//     })

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Erreur inconnue" });
//   }
// };
/* Create a session using SESSIONS */
const UpdatePassword = async (req, res, next) => {
  try {
    // get email and hashed password
    let new_password = req.body.new_password.toString();
    let current_password = req.body.current_password.toString();
    let email = req.session.user.email;

    console.log("email", email);

    await User.findOne({ email }).then((user) => {
      if (!user) {
        res.status(400).json({ message: "error" });
        return;
      } else {
        bcrypt.compare(current_password, user.password, function (err, result) {
          if (result) {
            user.password = new_password;
            user.save();
            res.status(200).json({ message: "true" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur inconnue" });
  }
};

//Supprimer un user
const deleteUser = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID unknown: " + req.params.id });
    }

    // Mettre à jour l'utilisateur comme supprimé dans la base de données
    await User.updateOne({ _id: req.params.id }, { deleted: true }).exec();

    // Supprimer la session
    if (req.session) {
      req.session.user = null;
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        } else {
          console.log("Session destroyed");
          res.clearCookie('connect.sid', { path: '/' });
          res.status(200).json({
            success: true,
            message: 'Logged out',
          });
        }
      });
    } else {
      console.log("Session not deleted");
      res.status(500).json({
        success: false,
        message: 'Session not found',
      });
      return;
    }
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Récupérer tous les utilisateurs
const GetAll = async (req, res) => {
  try {
    let result = await User.find();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer tous les utilisateurs
const GetEmailSearch = async (req, res) => {
  try {
    const username = req.query.username 
    console.log(username) 
    if(username.trim().length > 2) {
      let result = await User.find({'username': new RegExp('.*' + username + '.*'),'deleted':false })
      res.send(result);
    } else
    res.send([])
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


// Récupérer un seul utilisateur
const GetOne = async (req, res) => {
  try {
    const user = req.session.user; 
    const filter = { 
      _id: new mongoose.Types.ObjectId(user._id) 
    }
    let result = await User.findOne(filter);
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const checkUser = async (req, res) => {

  const { email, username } = req.query;

  try {
    // Use await with findOne, which returns a promise
    const user = await User.findOne({ $or: [{ email: email.trim() }, { username: username.trim() }] });
    console.log('User found:', user); 
    if (user) {

      console.log("user exists");
      
      // If the user exists, send an object with the property 'exists' set to true
      return res.status(200).send({ exists: true });
    } else {
      console.log("user does not exists");
      // If the user doesn't exist, send an object with the property 'exists' set to false
      return res.status(200).send({ exists: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};


// const SendResetEmail = async (req, res) => {
//   try {
//     const filter = { email: req.body.email };
//     await User.findOne(filter).then((user)=> {
//         if(!user) {
//             return;
//         } else {
//             user.password_reset_code = uuidv4();
//             const emailInfos = {
//                 from: "contact@cdec-digital.com",
//                 to: req.body.email, 
//                 subject: "Reset password email", 
//                 text: "Please click link to reset password", 
//                 html: `<h1>Email Receiver</h1><a href="http://localhost:3000/reset-password/${ user.password_reset_code }">Click here to reset email</a>`
//             }
//             main(emailInfos)
//             user.save()
//             res.status(200).json(user);
//         } 
//     }); 
//   } catch (err) {
//     console.log(err.message);
//   }
// };




// getAccessToken().then(accessToken => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: 'yacinecherifi032@gmail.com',
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.RE,
//         accessToken: accessToken
//     }
//   });
// });

// const SendResetEmail = async (req, res) => {
//   const { email } = req.body;
 

//   try {
//     const accessToken = await getAccessToken();

//     // Création du transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//           type: 'OAuth2',
//           user: 'yacinecherifi032@gmail.com',
//           clientId: process.env.CLIENT_ID,
//           clientSecret: process.env.CLIENT_SECRET,
//           refreshToken: process.env.REFRESH_TOKEN2,
//           accessToken: accessToken
//       }
//     });

//       // Vérification de l'existence de l'utilisateur avec l'e-mail fourni
//       const user = await User.findOne({ email });
     

//       if (!user) {
//           return res.status(404).json({ message: 'Ladresse email nappartient à aucun utilisateur' });
//       }
//       // Générer un code OTP
//       const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
//       console.log(otp)

//       // Récupération de l'e-mail de confiance de l'utilisateur
//       const trustedemail = user.trustedemail;
//       console.log(trustedemail)

//       // Définition des options de l'e-mail
//       const mailOptions = {
//           from: 'yacinecherifi032@gmail.com',
//           to: trustedemail,
//           subject: 'Subject',
//           text: `Body of the email: ${otp}`
//       };
//       // Envoi de l'e-mail
//       const info = await transporter.sendMail(mailOptions);
//       console.log('E-mail envoyé: ' + info.response);
      
//        // Mise à jour du code OTP dans la base de données
//       user.rtoken = otp;
//       await user.save();

//       transporter.close();

//      //Results
//    res.status(200).json({ message: 'Envoi du mail de réinitialisation réussi' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Erreur denvoi du mail de réinitialisation' });
//   } finally {
//       // transporter.close();
//   }
// };


// const ResetPassword = async (req, res) => {
//   const { email, otp, mdp } = req.body;
//     try {
//       const user = await User.findOne({
//         email,
//         rtoken: otp,
//       });
      
//       console.log(otp)
//       if (!user || user.rtoken !== otp) {
//         console.log("je suis ici 2")
//         return res.status(400).json({ message: 'Le code OTP saisi est incorrect' });
//     }
//       const salt = await bcrypt.genSalt(10);
//       // let new_password = await bcrypt.hash(req.body.new_password, salt);
//       const hashedPassword = await bcrypt.hash(mdp, salt);

//       const filter = { password_reset_code: req.body.password_reset_code };

//       await user.updateOne({password:hashedPassword})
//       user.rtoken = null;
//       await user.save();
//       res.status(200).json({ message: 'Le mdp a été mis à jour avec succés'});
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Erreur de mise à jour du mdp'});
//     }
//     //   await User.findOne(filter).then((user)=> {
//     //       if(!user) {
//     //         res.status(403).json({message: "Le code a expiré !"});
//     //       } else {
//     //         console.log("je suis ici")
//     //         user.password_reset_code = "xxxx";
//     //         user.password = new_password;
//     //         res.status(200).json(user); 
//     //       } 
//     //   }); 
//     // } catch (err) {
//     //   console.log(err.message);
//     // }
// };

// const ResetPassword = async (req, res) => {
//   const { email, otp, mdp } = req.body;
//     try {
//       const user = await User.findOne({
//         email,
//         rtoken: otp,
//       });
      
//       console.log(otp)
//       if (!user || user.rtoken !== otp) {
//         console.log("je suis ici 2")
//         return res.status(400).json({ message: 'Le code OTP saisi est incorrect' });
//     }
//       const salt = await bcrypt.genSalt(10);
//       // let new_password = await bcrypt.hash(req.body.new_password, salt);
//       const hashedPassword = await bcrypt.hash(mdp, salt);

//       const filter = { password_reset_code: req.body.password_reset_code };

//       await user.updateOne({password:hashedPassword})
//       user.rtoken = null;
//       await user.save();
//       res.status(200).json({ message: 'Le mdp a été mis à jour avec succés'});
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Erreur de mise à jour du mdp'});
//     }
//     //   await User.findOne(filter).then((user)=> {
//     //       if(!user) {
//     //         res.status(403).json({message: "Le code a expiré !"});
//     //       } else {
//     //         console.log("je suis ici")
//     //         user.password_reset_code = "xxxx";
//     //         user.password = new_password;
//     //         res.status(200).json(user); 
//     //       } 
//     //   }); 
//     // } catch (err) {
//     //   console.log(err.message);
//     // }
// };


// Exporter le module pour etre visible dans le même dossier
module.exports = {UpdateUser, checkUser, GetAll, GetOne, deleteUser, UpdatePassword, GetEmailSearch,UpdateAvatar,};
