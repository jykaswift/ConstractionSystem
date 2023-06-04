const nodemailer = require("nodemailer");

class mailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

  }

  async sendActivationLetter(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на сайте Normastroy.ru",
      text: "",
      html: `
        <div>
          <h1>Для активации аккаунта перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
        `,
    });
  }

  async sendNewPassword(to, password) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Восстановление пароля на Normastroy.ru",
      text: "",
      html: `
        <div>
          <h1>Ваш новый пароль на сайте ${process.env.CLIENT_DOMAIN}:</h1>
          <p></p>
          <h2>${password}</h2>
        </div>
        `,
    });
  }
}

module.exports = new mailService();
