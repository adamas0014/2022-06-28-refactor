
const sgMail = require('@sendgrid/mail')

const SENDGRID_API_KEY='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'


sgMail.setApiKey(SENDGRID_API_KEY)


const SendEmail = (to, subject, body) => {
    try{
        console.log('inside sendmail', to, subject, body)
        sgMail.send({
        to: to,
        from: 'sokacza@mcmaster.ca',
        subject: subject,
        text: body
        })
    }
    catch(e) {
        console.log('unable to send', e)
    }
}



module.exports = SendEmail