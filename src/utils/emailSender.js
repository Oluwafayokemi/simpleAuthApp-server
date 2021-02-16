import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

const email = {}
const transporter = nodemailer.createTransport(
  smtpTransport({
    host: 'sc800.whpservers.com',
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_SESSION_USER,
      pass: process.env.EMAIL_SESSION_PASSWORD
    }
  })
)

email.verifyConnection = () => {
  transporter.verify((error, success) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Server is ready to take our messages', success)
    }
  })
}

email.sendMessage = async user => {
  const { email, firstName, lastName, dateOfBirth } = user
  const mailBody = {
    from: email, // sender address
    to: process.env.EMAIL_SESSION_ADMIN, // list of receivers
    subject: 'New User Signed UP', // Subject line
    text: 'New User Created',
    html: `<h3 style="background-color: pink; color: black; padding: .5em; width: 450px; text-align: center;">Authentication Successful</h3>
    <div>Hello Manager, </div>
    <p>A new user by name ${firstName.toUpperCase()} ${lastName.toUpperCase()} just signed up, born ${
      dateOfBirth ? dateOfBirth.toUpperCase() : ''
    }. You can reach the user via ${email}<p>
    <p><strong>**Note if you are not subscribed to Ndali app, please ignore this Email.**<srong></p>`
  }
  // send mail with defined transport object
  await transporter.sendMail(mailBody, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: ' + info.response)
  })
}

export { email }
