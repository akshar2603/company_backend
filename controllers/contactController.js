import nodemailer from 'nodemailer'
// Function to send email to the admin
const sendEmail = async (req  , res) => {
  try {
    console.log(req.body)
   const  {name , email , message} = req.body ; 
    // console.log(name , email , message)
    // const name = "suresh" ; 
    // const email = "a@ga.com" ; 
    // const message =  "kem cho" ;
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
    return res.status(200).json({
      message: 'Email sent successfully we will get back to you in next one hour !',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

export { sendEmail };
