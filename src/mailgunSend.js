const mailgun = require('mailgun-js')
const mailcomposer = require('mailcomposer')

const MailgunClient = mailgun({
  apiKey: 'key-7bcornk7wpsd1ard9x1x5fof1inqejs5',
  domain: 'cape.io',
})

const defaultFrom = 'CAPE.io <kai@cape.io>'

function sendMimeMessage({ body, context, email, from, templateId, subject, to }) {
  const destination = email || to
  return new Promise((resolve, reject) => {
    mailcomposer({
      from: from || defaultFrom,
      to: destination,
      subject,
      body,
      html: compile(templateId, context),
    }).build((mailBuildError, message) => {
      if (mailBuildError) return reject(mailBuildError)
      const dataToSend = { to: destination, message: message.toString('ascii') }
      return MailgunClient.messages().sendMime(dataToSend, (sendError, res) => {
        if (sendError) return reject(sendError)
        return resolve(res)
      })
    })
  })
}
