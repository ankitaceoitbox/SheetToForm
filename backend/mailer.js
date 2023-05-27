const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'apps@ceoitbox.com',
        pass: 'rltrixbvvpijzqvm'
    }
});

app.get('/', (req, res) => {
    res.send('Running');
});


app.post('/send-otp', (req, res) => {
    const { otp_generator, userDetails, otpSettings } = req.body;
    userDetails['otp'] = otp_generator;
    let sendOTPTo = otpSettings[0];
    let subject = otpSettings[1];
    let body = otpSettings[2];

    subject = removeTags(userDetails, subject);
    body = removeTags(userDetails, body);

    const mailOptions = {
        to: sendOTPTo,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500).send('Error sending email');
        } else {
            const id = userDetails['Select Test'].match(/\/d\/(.+?)\//)[1];
            const percent = userDetails['Select Test'].split("|")[0].split("%%%%")[1];
            const response = {
                status: 'Email sent successfully',
                id,
                percent
            };
            res.status(200).send(response);
        }
    });
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});


function removeTags(userDetails, text) {
    // iterate over the keys of the object
    Object.keys(userDetails).forEach((key) => {
        // replace each tag in the text with its corresponding value
        const tag = `<<${key}>>`;
        if (tag == '<<Select Test>>') {
            const value = userDetails[key];
            text = text.replace(tag, value.split('|')[1]);
        } else {
            const value = userDetails[key];
            text = text.replace(tag, value);
        }
    });
    return text;
}
