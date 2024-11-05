const express = require('express')
const ContactMessengerController = require('../controllers/MessengerContactController')
const MessengerContactRouter = express.Router()

// Routes de l'utilisateur
MessengerContactRouter.get('/get-contact-list', ContactMessengerController.GetMyContacts)
MessengerContactRouter.post('/', ContactMessengerController.AddContact)
MessengerContactRouter.delete('/delete-one/:id', ContactMessengerController.DeleteContact)
MessengerContactRouter.get('/', ContactMessengerController.GetAll) 
MessengerContactRouter.delete('/', ContactMessengerController.DeleteAll) 
MessengerContactRouter.get('/getOne/:id', ContactMessengerController.getContactDetails) 
// Exporter le module
module.exports = MessengerContactRouter