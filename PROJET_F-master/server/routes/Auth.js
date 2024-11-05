const express = require('express')
const AuthController = require('../controllers/AuthController')
const AuthRouter = express.Router()

// Les routes pour les methodes non connectées
AuthRouter.post('/register', AuthController.Register)
AuthRouter.post('/login', AuthController.Login)
AuthRouter.post('/logout', AuthController.Logout)
AuthRouter.post('/verifyOTP2fa',AuthController.verifyOTP2FA)

// Exporter le module
module.exports = AuthRouter