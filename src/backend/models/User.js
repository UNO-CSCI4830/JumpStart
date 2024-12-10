const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationCodeExpiry: Date,
  role: { type: String, enum: ['guest', 'user', 'admin'], default: 'guest' },
});

module.exports = mongoose.model('User', userSchema);
