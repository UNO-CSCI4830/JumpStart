// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
require('dotenv').config(); // Load environment variables from .env file

const User = require('./models/User'); // Import your User model

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Initialize Express
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Jumpstart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Register Route (for sending verification code)
app.post('/api/register', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.endsWith('@unomaha.edu')) {
    return res.status(400).json({ message: 'Please provide a valid @unomaha.edu email address.' });
  }

  try {
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
    const expiry = Date.now() + 3600000; // Set expiry to 1 hour from now

    // Save or update the user in the database
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, verificationCode, verificationCodeExpiry: expiry });
    } else {
      user.verificationCode = verificationCode;
      user.verificationCodeExpiry = expiry;
    }
    await user.save();  // Make sure the user is saved successfully

    // Send the email with the verification code
    const msg = {
      to: email,
      from: 'jumpstart4830@gmail.com',
      subject: 'Verify Your Email Address',
      text: `Your verification code is: ${verificationCode}`,
      html: `<strong>Your verification code is: ${verificationCode}</strong>`,
    };

    await sgMail.send(msg);  // Send the email using SendGrid

    res.status(200).json({ message: 'Verification code sent successfully. Please check your email.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error sending verification code' });  // Log and send proper error message
  }
});



// Verify Code Route (for verifying the email using the code)
app.post('/api/verify-code', async (req, res) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res.status(400).json({ message: 'Email and verification code are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if verification code matches and is not expired
    if (user.verificationCode !== verificationCode || Date.now() > user.verificationCodeExpiry) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    // Mark the user as verified
    user.isVerified = true;
    user.verificationCode = undefined; // Clear the verification code
    user.verificationCodeExpiry = undefined; // Clear the expiry time
    await user.save();

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ message: 'Error verifying user.' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});
