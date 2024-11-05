const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

// Créer un schema pour l'utilisateur
const userSchema = mongoose.Schema({

    // Prénom de l'utilisateur
    first_name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,

    },

    // Patronime de l'utilisateur
    last_name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },

    // Nom utilisateur
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },

    // 0556555555 ou +213556250046
    phone_number: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 13
    },

    // Date de naissance 
    birth_date: Date,

    // Genre de l'utilisateur
    gender: {
        type: String,
    }, 
     
    // Email de l'utilisateur
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
    },

    avatar: {
        type: String,
      },
    // Mot de passe de l'utilisateur
    password: {
        type: String
    }, 
    
    trustedemail: {
        type: String,
        required : true,
      
      },
      rtoken:{
        type: String,
      },

    // Type d'utilisateur : Interne ou Externe
    // L'utilisateur externe utilisera le protocole SMTP/IMAP/POP3
    user_type: {
        type: Number,
        default: 0 // 0 Pour un utilisateur interne et 1 pour un utilisateur externe
    },

    // Adresse du server SMTP
    smtp_address: {
        type: String
    },

    // Port du serveur SMTP
    smtp_port: {
        type: String,
    },
    
    // Adresse du server POP3 ou Imap de l'utilisateur
    pop3_imap_address: {
        type: String,

    },

    // Port du server POP3 ou Imap de l'utilisateur
    pop3_imap_port: {
        type: String,
    },

    profile_picture: {
        type: String
    },

    online: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false,
      },
      groups: {
        type: String,
        maxLength: 100 ,
        ref:'Group'
    }
})

// hasher le mot de passe avant la sauvegarde
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Exporter le module 
module.exports = mongoose.model("User", userSchema)