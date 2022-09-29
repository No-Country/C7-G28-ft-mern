import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createTransport, TransportOptions } from 'nodemailer'
import { google } from 'googleapis'

@Injectable()
export class NodemailerService {
    constructor(private config: ConfigService, OAuth2) {}

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

    getOptionsGenerator(name, email, message) {
        const options = {
            from: 'Vita App',
            to: email,
            subject: 'Welcome to our app',
            text: `Hello ${name}, ${message}`,
            html: `<b>Hello ${name}, ${message}</b>`
        }
        return options
    }

    async sendMail(transport, options) {
        const info = await transport.sendMail({
            from: options.from,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        })
        console.log('Message sent: %s', info)
    }

    async mailSender(cb, options) {
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
            cb(createTransport(account as TransportOptions), options)
        })
    }
}
