const express = require('express')
const EmailController = require('../controllers/EmailController')
const EmailRouter = express.Router()
const uploadMiddl = require('../middleware/multer1');

// EmailRouter.post('/send-email', EmailController.SendEmail)
EmailRouter.post('/send-email', uploadMiddl.single("file"), EmailController.SendEmail);
EmailRouter.put('/update-email/:id', EmailController.UpdateEmail)
EmailRouter.get('/inbox', EmailController.GetInboxPaginated)
EmailRouter.get('/sent', EmailController.GetSentPaginated)
EmailRouter.get('/all', EmailController.GetAll)
EmailRouter.get('/:email', EmailController.GetUserEmails)
EmailRouter.get('/get-one/:id', EmailController.GetOne)
EmailRouter.get('/download/:id', EmailController.downloadAttachment); // route pour le telechargement 
EmailRouter.put('/markAsRead/:id', EmailController.markAsRead); // route vers la fonction markasread
EmailRouter.get('/unreadCount/:email', EmailController.GetUnreadCount);
// ///////////////////// DRAFT ROUTE ///////////////////////
// EmailRouter.get('/get-drafts', EmailController.getDrafts);
// EmailRouter.get('/get-pagDraft', EmailController.GetDraftPaginated)
// EmailRouter.put('/update-drafts/:id', EmailController.updateDraft);
// EmailRouter.post('/draft', EmailController.MarkAsDraft);
// ////////////////////// TRASH ROUTE ///////////////////////
// EmailRouter.get('/trashes', EmailController.getTrashes);
// EmailRouter.get('/trashes-page', EmailController.getTrashPaginated);
// EmailRouter.delete('/Delete/:id', EmailController.deleteEmail);
// EmailRouter.put('/move-to-trash/:id', EmailController.MoveToTrash);
// EmailRouter.put('/restore/:id', EmailController.RestoreFromTrash);


module.exports = EmailRouter