import sendgridMail from '@sendgrid/mail'
import config from '../../config'
import { emailVerification } from './templates/emailVerification'
import { passwordResetSuccess } from './templates/passwordResetSuccess'
import { resetPassword } from './templates/resetPassword'
sendgridMail.setApiKey(config.sendgrid.apiKey)

export default class Email {
  private baseUrl: string = 'http://localhost:5000'
  token: string
  html: string

  constructor (token: string) {
    this.token = token
  }

  private async sendMail (to: string, subject: string, html: string): Promise<any> {
    const mailInfo = await sendgridMail.send({
      from: {
        email: config.app.email,
        name: config.app.name
      },
      to,
      subject,
      html
    })
    return mailInfo
  }

  async resetPassword (to:string, subject:string, name: string): Promise<void | Error> {
    const html = resetPassword(this.token, this.baseUrl, name)
    await this.sendMail(to, subject, html)
  };

  async verification (to:string, subject:string, name:string): Promise<void | Error> {
    const html = emailVerification(this.baseUrl, this.token, name)
    await this.sendMail(to, subject, html)
  };

  async passwordResetSuccess (to:string, subject:string, name:string): Promise<void | Error> {
    const html = passwordResetSuccess(name)
    await this.sendMail(to, subject, html)
  };
}
