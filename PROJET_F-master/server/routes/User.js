// const express = require('express')
// const UserController = require('../controllers/UserController')
// const UserRouter = express.Router()
// const upload = require("./../middleware/multer");

// // Routes de l'utilisateur
// // UserRouter.get('/get-user/:id', UserController.GetOne)
// UserRouter.get("/get-user", UserController.GetOne);
// UserRouter.put('/:id', UserController.UpdateUser)
// UserRouter.put("/avatar/:id",upload.single("avatar"),UserController.UpdateAvatar)
// UserRouter.put('/update/update-password', UserController.UpdatePassword)
// UserRouter.delete('/:id', UserController.DeleteUser)
// UserRouter.get('/', UserController.GetAll)
// UserRouter.get('/checkUser', UserController.checkUser)
// UserRouter.get('/email-part', UserController.GetEmailSearch) 
// // UserRouter.post('/sendOtp', UserController.SendResetEmail)
// UserRouter.post('/resetPass', UserController.ResetPassword) 
// UserRouter.post('/sendOtp', UserController.SendResetEmail)
// UserRouter.post('/verify', UserController.verifyOtp)
// UserRouter.post('/changepsswrd', UserController.ResetPassword)
// UserRouter.get('/email-part', UserController.GetEmailSearch) 
// UserRouter.post('/resetPass', UserController.ResetPassword) 
// // Exporter le module
// module.exports = UserRouter   
const express = require('express')
const UserController = require('../controllers/UserController')
const UserRouter = express.Router()
const upload = require("./../middleware/multer");

// Routes de l'utilisateur
// UserRouter.get('/get-user/:id', UserController.GetOne)
UserRouter.get("/get-user", UserController.GetOne);
UserRouter.put('/:id', UserController.UpdateUser)
UserRouter.put("/avatar/:id",upload.single("avatar"),UserController.UpdateAvatar)
UserRouter.put('/update/update-password', UserController.UpdatePassword)
//UserRouter.delete('/:id', UserController.DeleteUser)
UserRouter.get('/', UserController.GetAll)
UserRouter.get('/checkUser', UserController.checkUser)
UserRouter.get('/email-part', UserController.GetEmailSearch) 
// UserRouter.post('/sendOtp', UserController.SendResetEmail)
//UserRouter.post('/resetPass', UserController.ResetPassword) 
//UserRouter.post('/sendOtp', UserController.SendResetEmail)
//UserRouter.post('/verify', UserController.verifyOtp)
//UserRouter.post('/changepsswrd', UserController.ResetPassword)
UserRouter.get('/email-part', UserController.GetEmailSearch) 
UserRouter.delete('/:id', UserController.deleteUser)
//UserRouter.post('/resetPass', UserController.ResetPassword) 
// Exporter le module
module.exports = UserRouter   