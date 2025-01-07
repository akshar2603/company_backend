const nodemailer = require('nodemailer');

// Function to send email to the admin
const sendEmail = async (name, email, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another service provider
      auth: {
        user: 'aksharlakhankiya@gmail.com', // Replace with your email
        pass: 'yyluvppqllqzggnj', // Replace with your email password
      },
    });

    const mailOptions = {
      from: email,
      to: 'aksharlakhankiya@gmail.com', // Replace with admin's email
      subject: 'New Contact Form Submission',
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    console.log('Sending email with options:', mailOptions);
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = { sendEmail };
