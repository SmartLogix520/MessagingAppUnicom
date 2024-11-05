const express = require('express')
const MessageController = require('../controllers/MessageController')
const MessageRouter = express.Router()

// Routes de la messagerie
MessageRouter.post('/send-message', MessageController.SendMessage)
// MessageRouter.post('/create-group', MessageController.CreateGroup)
// MessageRouter.get('/get-group/:id', MessageController.GetOneGroup)
// MessageRouter.post('/send-toGroup/:id', MessageController.SendMessageToGroup)
MessageRouter.delete('/delete-message/:id', MessageController.DeleteMessage)
MessageRouter.get('/conversation', MessageController.GetConversation)
MessageRouter.get('/', MessageController.GetAll)
MessageRouter.delete('/delete-all/', MessageController.DeleteAll)
MessageRouter.put('/addmember-group/:id', MessageController.AddMemberToGroup)
MessageRouter.delete('/deleteGroupMessage/:id', MessageController.DeleteGroupMessage)
MessageRouter.delete('/remove-Member/:id', MessageController.removeMemberFromGroup)
MessageRouter.get('/get-group-members/:id', MessageController.GetGroupMembers)
MessageRouter.get('/get-member-groups', MessageController.GetUserGroups)
MessageRouter.post('/create-group', MessageController.CreateGroup)
MessageRouter.get('/get-group-messages/:id', MessageController.getGroupMessages)
MessageRouter.put('/rename/:id', MessageController.RenameGroup)
MessageRouter.get('/get-group/:id', MessageController.GetOneGroup)
MessageRouter.post('/send-toGroup/:id', MessageController.SendMessageToGroup)

// Exportation du router/
module.exports = MessageRouter