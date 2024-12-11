const Router = require('express');
const { Instance, pullReq, postReq } = require('./utils');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = Router();

const ADMIN_EMAILS = [
  'yaguirre-duran@unomaha.edu',
  'elijahgnuse@unomaha.edu',
  'fmerino@unomaha.edu',
  'jocelynhorn@unomaha.edu',
  'sjohnson154@unomaha.edu',
  'ojimenez-gonzalez@unomaha.edu',
];

// Routes for handling advice and resources
const advice = new Instance("Posts", "advice");
router.get('/advice', async (req, res) => {
    console.log("Receptionist: GET request for advice");
    pullReq(advice, req, res);
});

router.post('/advice', async (req, res) => {
    console.log("Receptionist: POST request for advice");
    postReq(advice, req, res);
});

const resources = new Instance("Posts", "resources");
router.get('/resources', async (req, res) => {
    console.log("Receptionist: GET request for resources");
    pullReq(resources, req, res);
});

const limbo = new Instance("Posts", "limbo");
router.get('/limbo', async (req, res) => {
    console.log("Receptionist: GET request for limbo");
    pullReq(limbo, req, res);
});

router.post('/limbo', async (req, res) => {
    console.log("Receptionist: POST request for limbo");
    console.log(req.body);
    postReq(limbo, req, res);
});

/* ========== # User verification and registry # ========== */

const users = new Instance("Users", "users");

// Register Route (for sending verification code)
router.post('/register', async (req, res) => {
    console.log("Receptionist: POST request received for register");
    const { email } = req.body;

    if (!email || !email.endsWith('@unomaha.edu')) {
        return res.status(400).json({ message: 'Please provide a valid @unomaha.edu email address.' });
    }

    try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
        const expiry = Date.now() + 600000; // Set expiry to 10 mins from now

        let user;
        await users.read({ email: email });
        if (users.getPayload().length === 1) user = users.getPayload()[0];

        await new Promise(r => setTimeout(r, 50));

        // Save or update the user in the database
        if (!user) { // User doesn't exist, save!
            console.log("Receptionist: No user found. Creating new entry in Users.users");

            const role = ADMIN_EMAILS.includes(email) ? 'admin' : 'user';

            await users.write([{
                email: email,
                verificationCode: verificationCode,
                verificationCodeExpiry: expiry,
                role: role, 
                isVerified: false, 
            }]);
        } else {
            let edits = { // Set user verification credentials to pending
                verificationCode: verificationCode,
                verificationCodeExpiry: expiry,
            };
            await users.edit(user._id, edits); // Edit user DB entry to reflect
        }

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
router.post('/verify-code', async (req, res) => {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
        return res.status(400).json({ message: 'Email and verification code are required.' });
    }

    try {
        let user;
        await users.read({ email: email });
        if (users.getPayload().length === 1) user = users.getPayload()[0];

        await new Promise(r => setTimeout(r, 50));

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if verification code matches and is not expired
        if (user.verificationCode !== parseInt(verificationCode) || Date.now() > user.verificationCodeExpiry) {
            return res.status(400).json({ message: 'Invalid or expired verification code.' });
        }

        // Mark the user as verified and assign the 'user' or 'admin' role
        let edits = {
            isVerified: true,
            verificationCode: null,
            verificationCodeExpiry: null,
            role: ADMIN_EMAILS.includes(email) ? 'admin' : 'user', // Assign role based on email
        };

        await users.edit(user._id, edits); // Update user entry in database via users.edit()

        res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ message: 'Error verifying user.' });
    }
});

module.exports = router;
