// trashRoutes.js
const express = require('express');
const RouterTrash = express.Router();
const TrashController = require('../controllers/TrashController');


RouterTrash.get('/trashes', TrashController.getTrashes);
RouterTrash.get('/trashes-page', TrashController.getTrashPaginated);
RouterTrash.delete('/Delete/:id', TrashController.deleteEmail);
RouterTrash.put('/move-to-trash/:id', TrashController.MoveToTrash);
RouterTrash.put('/restore/:id', TrashController.RestoreFromTrash);
module.exports = RouterTrash;

