const mongoose = require("mongoose");
const Email = require("../models/Email");
const main = require("../helpers/MailSender");
const User = require("../models/User");
const path = require('path'); 


// /* Permet d'envoyer à un email */
// const SendEmail = async (req, res) => {
//   try {
//     const email = new Email(req.body);
//     email.save();
//     res.status(200).json(email);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// };
// const SendEmail = async (req, res) => {
//   try {
//     // Extraire les données nécessaires du corps de la requête
//     const { email_sender, email_receiver, subject, content, cc } = req.body;


// // Vérifiez si l'email_receiver existe dans la base de données
// const existingReceiver = await User.findOne({ email: email_receiver });

// if (!existingReceiver) {
//   console.log("inexistant")
//   return res.status(400).json({ message: 'cet email nexiste pas' });
// }

//     // Créer une instance du modèle Email
//     const email = new Email({
//       email_sender,
//       email_receiver,
//       subject,
//       content,
//       cc, // Inclure la CC dans l'instance de l'email
//     });
//      // Si votre middleware de gestion de fichiers (multer) est configuré, vous pouvez accéder à req.file
//      if (req.file) {
//       // Stocker uniquement le chemin du fichier dans la propriété attachment de l'email
//       email.file = req.file.path;
//       email.fileName = req.file.originalname;  
//     }
//     // Enregistrer l'email
//     await email.save();

//     res.status(200).json(email);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// };
const SendEmail = async (req, res) => {
  try {
    // Extraire les données nécessaires du corps de la requête
    const { email_sender, email_receiver, subject, content, cc } = req.body;

    // Assurez-vous que email_receiver est un tableau
    const receivers = Array.isArray(email_receiver) ? email_receiver : [email_receiver];

    // Vérifiez si les email_receiver existent dans la base de données
    const existingReceivers = await User.find({ email: { $in: receivers } ,deleted:false});

    console.log("existingReceivers:", existingReceivers);

    // Si un ou plusieurs destinataires n'existent pas dans la base de données
    if (existingReceivers.length !== receivers.length) {
      const nonExistingReceivers = receivers.filter(email => !existingReceivers.some(user => user.email === email));
      console.log("inexistant", nonExistingReceivers);
      return res.status(400).json({ message: `Les adresses e-mail suivantes n'existent pas: ${nonExistingReceivers.join(', ')}` });
    }

    // Itérer sur chaque destinataire pour créer et enregistrer un e-mail
    const emails = [];
    for (const receiver of receivers) {
      // Créer une instance du modèle Email
      const email = new Email({
        email_sender,
        email_receiver: receiver,
        subject,
        content,
        cc,
      });

      // Si votre middleware de gestion de fichiers (multer) est configuré, vous pouvez accéder à req.file
      if (req.file) {
        // Stocker uniquement le chemin du fichier dans la propriété attachment de l'e-mail
        email.file = req.file.path;
        email.fileName = req.file.originalname;  
      }

      // Enregistrer l'e-mail
      await email.save();

      emails.push(email);
    }

    res.status(200).json(emails);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
/* Permet de mettre à jour un email en cas de brouillon */
const UpdateEmail = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = req.body;
    await Email.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

/* Permet de supprimer un Email */
const DeleteEmail = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    await Email.findOneAndRemove(filter);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

/* Récupérer tous les emails */
const GetAll = async (req, res) => {
  try {
    let result = await Email.find();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

/* Récupérer tous les emails d'un utilisateur */
const GetUserEmails = async (req, res) => {
  try {
    const filter = { email_receiver: req.params.email };
    let result = await Email.find({ filter });
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

/* Récupérer uns seul email en utilisant son identifiant */
const GetOne = async (req, res) => {
  try {
    let result = await Email.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// /* Récupérer les emails page par page */
// const GetInboxPaginated = async (req, res, next) => {
//   try {
//     const { pageNumber = 1, pageSize = 10 , emailReceiver} = req.query;
//     const filter = {email_receiver: emailReceiver, draft: 0, trash: 0}

//     const totalPages = Math.ceil((
//       await Email.countDocuments(filter) / pageSize 
//     )); 
 
//     let emails = await Email.find(filter)
//       .limit(pageSize * 1)
//       .skip((pageNumber - 1) * pageSize)
//       .sort({sending_date: -1}); 

//     return res.status(200).send({
//       totalPages, 
//       emails,
//       page: pageNumber,
//     });
    
//   } catch (error) {
//     console.log(error.message);
//     next(error);
//   }
// };
const GetInboxPaginated = async (req, res, next) => {
  try {
    const { pageNumber = 1, pageSize = 10, emailReceiver } = req.query;
    const filter = {
      $or: [
        { email_receiver: emailReceiver },
        { cc: emailReceiver } // Ajout de cette condition pour les e-mails où vous êtes en copie carbone
      ],
      draft: 0,
      trash: 0
    };

    const totalPages = Math.ceil((await Email.countDocuments(filter)) / pageSize);

    let emails = await Email.find(filter)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize)
      .sort({ sending_date: -1 });

    return res.status(200).send({
      totalPages,
      emails,
      page: pageNumber,
    });

  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// /* Récupérer les emails sortants page par page */
// const GetSentPaginated = async (req, res, next) => {
//   try {
//     const { pageNumber = 1, pageSize = 10, emailSender = '' } = req.query;
//     const filter = {email_sender : emailSender, trash : 0, draft : 0}
    
//     const totalPages = Math.ceil((
//       await Email.countDocuments(filter) / pageSize 
//     )); 
    
//     let emails = await Email.find(filter)
//       .limit(pageSize * 1)
//       .skip((pageNumber - 1) * pageSize)
//       .sort({sending_date: -1}); 

//     return res.status(200).send({
//       totalPages, 
//       emails,
//       page: pageNumber,
//     });
    
//   } catch (error) {
//     console.log(error.message);
//     next(error);
//   }
// };

const GetSentPaginated = async (req, res, next) => {
  try {
    const { pageNumber = 1, pageSize = 10, emailSender = '', emailCC = '' } = req.query;
    const filter = {
      $or: [
        { email_sender: emailSender },
        { cc: emailCC }
      ],
      trash: 0,
      draft: 0
    };

    const totalPages = Math.ceil(
      (await Email.countDocuments(filter)) / pageSize
    );

    let emails = await Email.find(filter)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize)
      .sort({ sending_date: -1 });

    return res.status(200).send({
      totalPages, 
      emails,
      page: pageNumber,
    });

  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////// DRAFTS CONTROLLERS //////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getDrafts = async (req, res) => {
  try {
    const emails = await Email.find({ draft: 1 });
    res.status(200).json(emails);
  } catch (error) {
    console.error('Erreur lors de la récupération des brouillons :', error.message);
    res.status(500).json({ message: 'Erreur Interne du Serveur' });
  }
};


const MarkAsDraft = async (req, res) => {
  try {
    // Créez une nouvelle instance de l'e-mail en définissant draft à 1
    const emails = new Email({ ...req.body, draft: 1 });
    
    // Enregistrez l'e-mail
    await emails.save();

    res.status(200).json(emails);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const updateDraft = async (req, res) => {
  try {
      const { id } = req.params; // Change 'emailId' to 'id'
      const updateDraft = await Drafts.findByIdAndUpdate(id, req.body, { new: true });
      if (!updateDraft) {
          return res.status(404).json({ message: 'Brouillon non trouvé' });
      }
      res.json({ draft: updateDraft, message: 'Brouillon modifié avec succès' });
  } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la modification du brouillon', error: error.message });
  }
};



/* Récupérer les emails sortants page par page */
const GetDraftPaginated = async (req, res, next) => {
  try {
    const { pageNumber = 1, pageSize = 10 , emailSender} = req.query;
    const filter = {email_sender : emailSender, draft: 1, trash:0}

    const totalPages = Math.ceil((
      await Email.countDocuments(filter) / pageSize 
    )); 
 
    let emails = await Email.find(filter)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize)
      .sort({sending_date: -1}); 

    return res.status(200).send({
      totalPages, 
      emails,
      page: pageNumber,
    });
    
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////// TRASH CONTROLLERS //////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const MoveToTrash = async (req, res) => {
  try {
    const id = req.params.id;

    // Mettez à jour le champ inTrash de 0 à 1 dans le document Email
    const updatedEmail = await Email.findByIdAndUpdate(id, { trash: 1 }, { new: true });

    if (!updatedEmail) {
      return res.status(404).json({ message: 'E-mail introuvable' });
    }

    res.status(200).json({ message: 'Champ inTrash mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du champ inTrash :', error.message);
    res.status(500).json({ message: 'Erreur Interne du Serveur' });
  }
};


const getTrashes = async (req, res) => {
  try {
    const emails = await Email.find({ trash: 1 });
    res.status(200).json(emails);
  } catch (error) {
    console.error('Erreur lors de la récupération des brouillons :', error.message);
    res.status(500).json({ message: 'Erreur Interne du Serveur' });
  }
};
const deleteEmail = async (req, res) => {
  try {
      const id = req.params.id;

      // Vérifier si l'e-mail existe dans la corbeille
      const email = await Email.findById(id);
      if (!email) {
          return res.status(404).json({ message: 'Email not found in the trash' });
      }

      // Supprimer définitivement l'e-mail de la collection "trashes"
      await Email.findByIdAndDelete(id);

      res.json({ message: 'Email deleted successfully' });
  } catch (error) {
      console.error('Error deleting email:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getTrashPaginated = async (req, res, next) => {
  try {
      const { pageNumber = 1, pageSize = 10, emailSender = '' } = req.query;
      const { user } = req.session
      const filter = { email_sender: emailSender, trash: 1 }

      const totalPages = Math.ceil(
          (await Email.countDocuments(filter)) / pageSize
      );

      let emails = await Email.find(filter)
          .limit(pageSize * 1)
          .skip((pageNumber - 1) * pageSize)
          .sort({ sending_date: -1 });

      return res.status(200).send({
          totalPages,
          emails,
          page: pageNumber,
      });

  } catch (error) {
      console.log(error.message);
      next(error);
  }
};
// Restaurer un email depuis la corbeille
const RestoreFromTrash = async (req, res) => {
  try {
    const emailId = req.params.id;

    // Mettez à jour le champ trash de 1 à 0 dans le document Email
    const updatedEmail = await Email.findByIdAndUpdate(emailId, { trash: 0 }, { new: true });

    if (!updatedEmail) {
      return res.status(404).json({ message: 'E-mail introuvable' });
    }

    res.status(200).json({ message: 'Champ trash mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du champ trash :', error.message);
    res.status(500).json({ message: 'Erreur Interne du Serveur' });
  }
};
const downloadAttachment = async (req, res) => {
  try {
    const emailId = req.params.id;
    const email = await Email.findById(emailId);

    if (!email || !email.file) {
      return res.status(404).json({ message: 'Attachment not found' });
    }

    const filePath = path.join(__dirname, `../${email.file}`);
    res.download(filePath);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Dans votre contrôleur
// cette fonction marque l'email comme lu , elle change la propriété read en 1 
const markAsRead = async (req, res) => {
  try {
    const emailId = req.params.id;
    const updatedEmail = await Email.findByIdAndUpdate(emailId, { read: 1 }, { new: true });

    if (!updatedEmail) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Ajoutez la logique pour marquer l'e-mail comme lu
    updatedEmail.read = 1;

    // Sauvegardez les modifications
    await updatedEmail.save();

    res.status(200).json(updatedEmail);
  } catch (error) {
    console.error('Error marking email as read:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





const emailInfos = {
    from: "contact@cdec-digital.com",
    to: "snccdec@gmail.com", 
    subject: "Reset password email", 
    text: "Please click link to reset password", 
    html: '<h1>Email Receiver</h1>' 
}

const sendSMTPEmail = async (req, res) => {
    main(emailInfos);
    res.status(200).send({message: "Email sent"})
}; 

// notifs
const GetUnreadCount = async (req, res) => {
  try {
    const emailReceiver = req.params.email; // Assurez-vous que le paramètre est correctement récupéré

    const unreadCount = await Email.countDocuments({
      email_receiver: emailReceiver,
      read: 0
    });

    res.status(200).json({ unreadEmailsCount: unreadCount });
  } catch (error) {
    console.error('Error getting unread count:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* Exporter le module */
module.exports = {
  getDrafts, 
  updateDraft, 
  MarkAsDraft,
  sendSMTPEmail,
  SendEmail,
  UpdateEmail,
  GetAll,
  GetUserEmails,
  GetOne,
  DeleteEmail,
  GetInboxPaginated,
  GetSentPaginated,
  GetDraftPaginated,
  getTrashPaginated,
  getTrashes,
  deleteEmail,
  MoveToTrash,
  RestoreFromTrash,
  downloadAttachment,
  markAsRead,
  GetUnreadCount 
};
