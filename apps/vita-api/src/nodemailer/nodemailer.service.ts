import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createTransport, Transporter, TransportOptions } from 'nodemailer'
import { google } from 'googleapis'
import { MailOptions } from './models'

@Injectable()
export class NodemailerService {
    constructor(private config: ConfigService) {}

    private getNodemailerConfig() {
        const config = {
            service: this.config.get('MAIL_SERVICE'),
            auth: {
                type: 'OAuth2',
                user: this.config.get('MAIL_USER'),
                clientId: this.config.get('MAIL_CLIENT_ID'),
                clientSecret: this.config.get('MAIL_CLIENT_SECRET'),
                refreshToken: this.config.get('MAIL_REFRESH_TOKEN'),
                accessToken: ''
            }
        }
        return config
    }

    private async sendMail(transport: Transporter, options: MailOptions) {
        const info = await transport.sendMail(options)
        return info
    }

    async mailSender(options: MailOptions) {
        const account = this.getNodemailerConfig()
        const OAuth2 = google.auth.OAuth2
        const oauth2Client = new OAuth2(
            account.auth.clientId,
            account.auth.clientSecret,
            'https://developers.google.com/oauthplayground'
        )
        oauth2Client.setCredentials({
            refresh_token: account.auth.refreshToken
        })
        oauth2Client.getAccessToken((err, token) => {
            if (err) throw new Error(err.message)
            account.auth.accessToken = token
            return this.sendMail(
                createTransport(account as TransportOptions),
                options
            )
        })
    }
}
