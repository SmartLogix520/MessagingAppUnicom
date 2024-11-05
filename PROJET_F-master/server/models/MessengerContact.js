const mongoose = require("mongoose")

const messengerContactSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true
    },

    username: {
        type: String
    },

    username2: {
        type: String
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    contact_id: {
        type: String,
        required: true,
 
    },

    user_id: {
        type: String,
        required: true,

    },

    user_avatar: {
        type: String,
        default: 'http://localhost:5000/public/medias/pi.jpg'
    },

    creation_date: { 
        type: Date,
        required: true,
        default: Date.now
    },

  });

// Exporter le module Message
module.exports = mongoose.model("MessengerContact", messengerContactSchema)