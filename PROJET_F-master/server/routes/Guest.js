const express = require('express')
const GuestController = require('../controllers/GuestController')
const GuestRouter = express.Router()
const upload = require("./../middleware/multer");

GuestRouter.post('/verify', GuestController.verifyOtp)
 GuestRouter.post('/sendOtp', GuestController.SendResetEmail)
 //GuestRouter.post('/resetPass', GuestController.ResetPassword) 
 GuestRouter.post('/changepsswrd', GuestController.ResetPassword)
// Exporter le module
module.exports = GuestRouter   