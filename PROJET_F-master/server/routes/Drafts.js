const express = require('express');
const DraftsRouter = express.Router();
const DraftsController = require('../controllers/DraftsController');

// Récupérer tous les brouillons
DraftsRouter.get('/get-drafts', DraftsController.getDrafts);

// Récupérer les brouillons paginés
DraftsRouter.get('/drafts-page', DraftsController.getDraftsPaginated);

// Mettre à jour un brouillon
DraftsRouter.put('/update-drafts/:id', DraftsController.updateDraft);
DraftsRouter.post('/draft', DraftsController.MarkAsDraft);

module.exports = DraftsRouter;
