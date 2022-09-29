import { createTransport, TransportOptions } from 'nodemailer'
import { google } from 'googleapis'

const OAuth2 = google.auth.OAuth2

const account = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'vita.app.new@gmail.com',
        clientId:
            '169349706257-eikq46933p5j9fculgqs7rlssoq4rqft.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken:
            '1//04KCo3S93lHWoCgYIARAAGAQSNwF-L9IroS9qqA1p6-__f-cuSDkGSwY_HtpL1ZlKcZyH6aH4OgV1IJFuszH2_HpSDIMojHXDxTI',
        accessToken: ''
    }
}

const mailSender = async (cb, options) => {
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

async function main() {
    const optionsGenerator = (name, email, message) => {
        return {
            from: 'Vita App',
            to: email,
            subject: 'Welcome to our app',
            text: `Hello ${name}, ${message}`,
            html: `<b>Hello ${name}, ${message}</b>`
        }
    }
    const sendMail = async (transport, options) => {
        const info = await transport.sendMail({
            from: options.from,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        })
        console.log('Message sent: %s', info)
    }
    const mailsSenders = [
        mailSender(
            sendMail,
            optionsGenerator(
                'Antonella',
                'bpadros@gmail.com',
                'Te estoy mandando este mail desde mi aplicación'
            )
        ),
        mailSender(
            sendMail,
            optionsGenerator(
                'Antonella',
                'benjamin14005@gmail.com',
                'Te estoy mandando este mail desde mi aplicación'
            )
        )
    ]
    Promise.all(mailsSenders).then(() => console.log('All mails sent'))
}

main().catch(console.error)
