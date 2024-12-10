const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Define the email message
const msg = {
  to: 'sjohnson154@unomaha.edu', 
  from: 'jumpstart4830@gmail.com',  
  subject: 'Verify Your Email Address',
  text: 'Your verification code is: 123456\n\n\n', 
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
