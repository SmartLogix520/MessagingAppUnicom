const mongoose = require("mongoose");
const MessengerContact = require("../models/MessengerContact");
const User = require("../models/User");

const AddContact = async (req, res) => {
  try {
    console.log(req.session.user)
    // user: Jeanclauss
    User.findOne({username: req.body.username}).then((user)=> {
      // Chercher le contact dans la base de données
      MessengerContact.findOne({contact_id: user._id, user_id: req.body.user_id})
        .then((existingContact) => {
          // Si le contact existe déjà, renvoyer un message d'erreur
          if (existingContact) {
            console.log("contact existe déja")
            res.status(400).json({ message: "Le contact a déjà été ajouté." });
          } else {
            // Sinon, créer le nouveau contact
            const msgContact = new MessengerContact({
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              contact_id: user._id,
              user_id: req.body.user_id,
              user_avatar: user.profile_picture,
              username: user.username,
              username2: req.session.user.username
            });

            // Enregistrer le nouveau contact
            msgContact.save().then(result => {
              res.status(200).json(result);
            });
            console.log("contact créer avec succés")
          }
        });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


const DeleteAll = async (req, res) => {
  try {
    await MessengerContact.deleteMany({})
    res.status(200).send({message: "Success"})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


const DeleteContact = async (req, res) => {
  try {
    
    console.log(req.params.id)
    const filter = { 
      _id: new mongoose.Types.ObjectId(req.params.id) 
    }
    await MessengerContact.findOneAndDelete(filter);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer la conversation entre deux utilisateurs
const GetMyContacts = async (req, res) => {
  try {
    let result = await MessengerContact.find({$or: [{ user_id: req.session.user._id }, { contact_id: req.session.user._id }]});
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getContactDetails = async (req, res) => {
  try {     
     console.log("contactId")
     const conversationId = req.params.id;

      // Recherche de la conversation dans la base de données en fonction de son ID
      const conversation = await MessengerContact.findById(conversationId);

      if (!conversation) {
          return res.status(404).json({ message: "Conversation introuvable" });
      }

      // Récupérer l'ID du contact à partir de la conversation
      const contactId = conversation.contact_id;

      console.log(contactId)

      // Recherche du contact dans la base de données en fonction de son contact_id
      const contact = await MessengerContact.findOne({ contact_id: contactId });

      if (!contact) {
          return res.status(404).json({ message: "Contact introuvable" });
      }

      // Récupérer les informations du contact
      const contactInfo = {
          first_name: contact.first_name,
          last_name: contact.last_name,
          username: contact.username,
          email: contact.email,
          phone_number: contact.phone_number,
          // Ajoutez d'autres champs ici selon vos besoins
      };

      // Retourner les détails du contact
      res.status(200).json(contactInfo);
  } catch (error) {
      console.error("Erreur lors de la récupération des détails du contact :", error);
      res.status(500).json({ message: "Erreur lors de la récupération des détails du contact", error: error.message });
  }
};

const GetAll = async (req, res) => {
  try {
    
    let result = await MessengerContact.find();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}; 



// Exporter les methodes du module
module.exports = { AddContact, DeleteContact, GetMyContacts, GetAll, DeleteAll, getContactDetails };
