const Router = require('express');
const {Instance, pullReq, postReq} = require ('./utils');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail'); // Import SendGrid
// const User = require('./models/User'); // Ensure you have the User model
const router = Router();

// BUG: Switching tabs fast enough can result in crashing instance.

const advice = new Instance("Posts", "advice");
router.get('/advice', async(req, res) => {
    console.log("Receptionist: GET request for received");
    pullReq(advice, req, res);
});

const resources = new Instance("Posts", "resources");
router.get('/resources', async(req, res) => {
    console.log("Receptionist: GET request for received");
    pullReq(resources, req, res);
});

const limbo = new Instance("Posts", "limbo");
router.get('/limbo', async(req, res) => {
    console.log("Receptionist: GET request for received");
    pullReq(limbo, req, res);
});

router.post('/limbo', async(req, res) => {
    console.log("Receptionist: POST request for received");
    console.log(req.body);
    postReq(limbo, req, res);
});

/* ========== # User verification and registry # ========== */
// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);  // Replace with your actual SendGrid API key
const users = new Instance("Users", "users"); // NOTE: Not sure if this is the intended structure

router.post('/register', async(instance, req, res) => {
    const { email } = req.body;
  
    if (!email || !email.endsWith('@unomaha.edu')) {
      return res.status(400).json({ message: 'Please provide a valid @unomaha.edu email address.' });
    }
  
    try {
      // Generate a verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  
      // Create a temporary user record in the database with the verification code
      // NOTE: User DB entry schema! (Also found in models/User.js)
      const tempUser = {
        email: email,
        verificationCode: verificationCode.toString(),
        verificationCodeExpiry: Date.now() + 3600000, // 1 hour expiry time _ change to 5 mins
        isVerified: false,  // User is not verified yet
      };
  
      // Save the temporary user (not the actual user yet)
      // Pushes to User DB
      await users.push([tempUser]); // WARNING: THIS HAS NOT BEEN VERIFIED
  
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

router.post('/authenticate', async(req,res) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res.status(400).json({ message: 'Email and verification code are required' });
  }

    if (1) { // skipping writing to DB because I'm scared of the instance calls rn
        res.status(502).json({message: "Not implemented yet!"});
    } else {

    try {
        // Find the temporary user by email
            // WARNING: THIS HAS NOT BEEN VARIFIED
            const tempUser = await users.find({email: email})[0];

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
            // TODO: Implement Database.edit(); 
            // await tempUser.save();

            res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
        } catch (error) {
            console.error('Error verifying code:', error);
            res.status(500).json({ message: 'Error verifying code' });
        }
    }

});

module.exports = router;
