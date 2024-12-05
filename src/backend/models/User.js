const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verificationCode: {
    type: String,
  },
  verificationCodeExpiry: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
