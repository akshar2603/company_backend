import nodemailer from 'nodemailer'
// Function to send email to the admin
const sendEmail = async (req  , res) => {
  try {

   const  {name , email , message} = req.body ; 
   
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another service provider
      auth: {
        user: 'akshar2.dev@gmail.com', // Replace with your email
        pass: 'bclhkpfemzjrbiao', // Replace with your email password
      },
    });
  
    const mailOptions = {
      from: 'akshar2.dev@gmail.com',
      to: email, 
      subject: 'New Contact Form Submission',
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

  
    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      message: 'Email sent successfully we will get back to you in next one hour !',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

export { sendEmail };
