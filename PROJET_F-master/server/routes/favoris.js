const express = require('express')
const FavorisController = require('../controllers/favoris')
const FavorisRouter = express.Router()


FavorisRouter.put('/marks-fav/:id', FavorisController.MarkAsFavoris)
FavorisRouter.get('/get-fav', FavorisController.getFavoris)
FavorisRouter.get('/get-fav-page', FavorisController.getFavPaginated)
FavorisRouter.put('/des-fav/:id', FavorisController.DesMarkAsFavoris )

module.exports = FavorisRouter