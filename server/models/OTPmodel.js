const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserOTPVerificationSchema = new Schema({
    email : String,
    otp : String,
    createdAt: Date,
    expiredAt: Date,
});

const UserOTPVerification = new mongoose.model( "UserOTPVerification", UserOTPVerificationSchema);

module.exports = UserOTPVerification;