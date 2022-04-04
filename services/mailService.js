const nodeMailer = require('nodemailer')

class MailService {
  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async send(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'При желании отмена записи: Edith',
      text: '',
      html:
        `
                <div>
                    <h1>Для отмены перейдите по ссылке</h1>
                    <a href="${link}">Ссылка на отмену</a>
                </div>
                `
    })
  }
}

module.exports = new MailService()
