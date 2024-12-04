// Load environment variables from .env file
require('dotenv').config()

// Import SendGrid's Node.js mail package
const sgMail = require('@sendgrid/mail')

// Set the SendGrid API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Define the email message
const msg = {
  to: 'sjohnson154@unomaha.edu',  // Replace with your recipient email
  from: 'jumpstart4830@gmail.com',  // Replace with your verified sender email
  subject: 'Verify Your Email Address',
  text: 'Your verification code is: 123456\n\n\n',  // Plain text message
}

// Send the email
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully!')
  })
  .catch((error) => {
    console.error('Error sending email:', error)
  })
