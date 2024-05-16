import nodemailer from "nodemailer";
import { configObject } from "../config/connectDB.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: configObject.gmail_user,
        pass: configObject.gmail_pass,
    },
    tls: {
      rejectUnauthorized: false // Deshabilitar la verificación del certificado SSL
  }
})

 const sendEmail = async (to, subject, html, attachments) => await transport.sendMail({
  from: 'coder test <laureano105@gmail.com>',
  to, 
  subject,
  html,
  attachments: [{
    filename: 'para-web.png',
    path: `${__dirname}/para-web.png`,
    cid: 'para-web'
  }]
})

export default sendEmail