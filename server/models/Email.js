const mongoose = require("mongoose")

// Créer un schema poue les emails
const emailSchema = mongoose.Schema({

    // Email d'envoi du mail
    email_sender: { 
        type: String,
        required: true,
        maxLength: 100,
    },

    // Email de récéption du mail
    email_receiver: { 
        type: [String], // Utilisez un tableau de chaînes pour stocker plusieurs adresses e-mail
        required: true,
        validate: {
            validator: function(arr) {
                return arr.length > 0; // Assurez-vous qu'il y a au moins une adresse e-mail
            },
            message: 'Au moins une adresse e-mail est requise.'
        }
    },
    

    // Objet de l'email
    subject: {  
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },

    // Date d'envoi du mail
    sending_date: { 
        type: Date,
        required: true,
        default: Date.now
    },

    // Date de récéption du mail
    reception_date: { 
        type: Date,
        required: true,
        default: Date.now
    },
    
    // Contenu de l'email
    content: { 
        type: String,
        minLength: 1
    },
    
    // Copie carbone de l'émail
    cc: { 
        type: String
    },
    
   // Pièce jointe de l'email
   file: {
    type: String,
    required: [false, "Please provide a file"],
  },
  fileName: {
    type: String,
  },

    read: {
        type: Number,
        default: 0
    },

    draft: {
        type: Number,
        default: 0
    },

    trash: {
        type: Number,
        default: 0
    },
    favoris: {
        type: Number,
        default: 0
    },
    sent: {
        type: Number,
        default: 0
    }
})

// Exporter l'email
module.exports = mongoose.model("Email", emailSchema)