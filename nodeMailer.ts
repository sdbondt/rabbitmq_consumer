import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
})

interface EmailService {
    email: string;
    text: string;
    subject: string;
}

const sendMail = ({email, text, subject }: EmailService) =>
  transporter.sendMail({
    to: email,
    subject,
    text,
    from: process.env.EMAIL,
  })

export default sendMail
