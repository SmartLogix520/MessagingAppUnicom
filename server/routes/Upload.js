const express = require('express')
const UploadController = require('../controllers/UploadController')
const UploadRouter = express.Router()

// Uploader un fichier
UploadRouter.post('/', UploadController.UploadFile)
// Uploader un fichier audio
UploadRouter.post('/audio-upload/', UploadController.UploadAudio)
// Exporter le module
module.exports = UploadRouter