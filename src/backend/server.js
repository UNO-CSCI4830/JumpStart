const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail'); // Import SendGrid
const User = require('./models/User'); // Ensure you have the User model

const app = express();
const PORT = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);  // Replace with your actual SendGrid API key

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Jumpstart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// /api/register route
app.post('/api/register', async (req, res) => {
    const { email } = req.body;
  
    if (!email || !email.endsWith('@unomaha.edu')) {
      return res.status(400).json({ message: 'Please provide a valid @unomaha.edu email address.' });
    }
  
    try {
      // Generate a verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  
      // Create a temporary user record in the database with the verification code
      const tempUser = new User({
        email,
        verificationCode: verificationCode.toString(),
        verificationCodeExpiry: Date.now() + 3600000, // 1 hour expiry time _ change to 5 mins
        isVerified: false,  // User is not verified yet
      });
  
      // Save the temporary user (not the actual user yet)
      await tempUser.save();
  
      // Send the verification code to the user's email using SendGrid
      const msg = {
        to: email,
        from: 'your-email@unomaha.edu',  // Use your verified SendGrid email address
        subject: 'Verify your email address',
        text: `Your verification code is: ${verificationCode}`,
      };
  
      // Send email and handle errors
      await sgMail.send(msg).then(
        () => {
          res.status(200).json({ message: 'Verification code sent successfully. Please check your email.' });
        },
        (error) => {
          console.error('Error sending email:', error);
          res.status(500).json({ message: 'Error sending verification code', error: error.response.body });
        }
      );
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Error during registration' });
    }
  });
  

// /api/verify-code route
app.post('/api/verify-code', async (req, res) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res.status(400).json({ message: 'Email and verification code are required' });
  }

  try {
    // Find the temporary user by email
    const tempUser = await User.findOne({ email });

    if (!tempUser) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    // Check if the verification code matches
    if (tempUser.verificationCode !== verificationCode) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Check if the verification code has expired
    if (Date.now() > tempUser.verificationCodeExpiry) {
      return res.status(400).json({ message: 'Verification code has expired' });
    }

    // Add the user to the database as a verified user
    tempUser.isVerified = true;
    tempUser.verificationCode = undefined; // Remove the verification code
    tempUser.verificationCodeExpiry = undefined; // Remove the expiry time

    // Save the verified user
    await tempUser.save();

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Error verifying code:', error);
    res.status(500).json({ message: 'Error verifying code' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
