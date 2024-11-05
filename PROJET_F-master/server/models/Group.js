const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: String, ref: 'User' }] ,// Utilisez la référence à votre modèle User
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // Relation avec les messages
    

});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

// on doit ajouter groupId