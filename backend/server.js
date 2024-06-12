require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-email", (req, res) => {
  //api define in the config of vite.config.js
  const {
    name,
    email,
    company,
    need,
    description,
    budget,
    timeline,
    findMe,
    favorite,
  } = req.body;
  // Construire le texte de l'email en incluant toutes les données du formulaire
  const emailText = `
        Name: ${name}
        Email: ${email}
        Company: ${company}
        Need: ${need}
        Details about the project: ${description}
        Budget: ${budget}
        Timeline: ${timeline}
        How they find me: ${findMe}
        Favorite Food or Artist: ${favorite}
    `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Contact work",
    text: emailText,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
