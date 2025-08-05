const mongoose = require("mongoose")

const callSchema = mongoose.Schema({

    caller_id: { 
        type: String,
        required: true,
        maxLength: 100,
    },

    // Email de récéption du mail
    receiver_id: { 
        type: String,
        required: true,
        maxLength: 100
    },
    
    // Socket identifier
    socket: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    // Missed : 3, Ended: 1, Refused 2
    status: {
        type: Number,
        default: 0
    },
    
    // Conversation time in seconds
    dure: {
        type: String, 
        default: ""
    }
})

// Exporter l'email
module.exports = mongoose.model("Call", callSchema)