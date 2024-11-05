const mongoose = require("mongoose")

// Créer le schema pour la  messagerie instantanée
const messageSchema = mongoose.Schema({


    content : { 
        type: String, 
        required: true, 
        
      },
    // Identifiant de l'utilisateur qui envoie le message
    sender_id: { 
      type: String, 
      required: true, 
      maxLength: 100,
      unique : true
    },

    // Identifiant de l'utilisateur qui reçoit le message
    receiver_id: { 
        
        type: String,  
        required: true,   
        maxLength: 100
    },  

    // Date d'envoi du message instantané
    sending_date: { 
        type: Date, 
        default: Date.now
    },

    // Date de reception du message
    reception_date: Date,

    // Tester si le message est lut ou pas
    read: { 
        type: Boolean, 
        default: false
    },
    
    // Si le message est supprimé
    deleted: { 
        type: Boolean, 
        default: false
    },

    message_type: {
        type: Number,
       
        enom: [0, 1]
    },

    url: {
        type: String
    },

    conversation_id: {
        type: String
    },
    group_id: {
        type: String,

        maxLength: 100 ,
        ref:'Group'
    }
})

// Exporter le module Message
module.exports = mongoose.model("Message", messageSchema)