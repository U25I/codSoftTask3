const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle contact form POST
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_TO,
    subject: `New message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.send('Error sending message.');
    }
    res.send('Message sent successfully!');
  });
});

// Protected resume route
app.get('/resume', (req, res) => {
  const password = req.query.password;
  if (password === process.env.RESUME_PASSWORD) {
    res.sendFile(path.join(__dirname, 'public', 'resume.html'));
  } else {
    res.send('Access Denied. Incorrect password.');
  }
});

// Start server
app.listen(3000, () => {
  console.log(`Server running at http://localhost:${3000}`);
});
