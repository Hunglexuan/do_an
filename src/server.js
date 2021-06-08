require('dotenv').config()
import http from 'http';
import app from './app';
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const HTTP_PORT = normalizePort(process.env.PORT || 8000);
app.set('port', HTTP_PORT);
http.createServer(app).listen(HTTP_PORT, onListening);

function onListening() {
    let addr = this.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('           Web server listening on ' + bind);
    console.log('           Go to url: "http://localhost:' + addr.port + '"');
}


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //replace with your email provider
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}


app.post("/send", (req, res) => {
    //1.
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
        console.log(fields);
        Object.keys(fields).forEach(function (property) {
            data[property] = fields[property].toString();
        });

        //2. You can configure the object however you want
        const mail = {
            from: 'hunglemanh.tcom@gmail.com',
            to: 'sales@tcom-japan.com',
            subject: '[Yêu Cầu Khách Hàng - TCOM Japan]',
            text: `Tên công ty: ${data.company_name} \n Tên khách hàng: ${data.name} \n Số điện thoại của khách: ${data.phone} \n Email khách: <${data.email}> \n Ghi chú: ${data.description} \n
            `,
        };

        //3.
        transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong.");
            } else {
                res.status(200).send("Email successfully sent to recipient!");
            }
        });
    });
});


