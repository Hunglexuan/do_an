require("dotenv").config();
import http from "http";
import app from "./app";
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const HTTP_PORT = normalizePort(process.env.PORT || 8000);
app.set("port", HTTP_PORT);
http.createServer(app).listen(HTTP_PORT, onListening);

function onListening() {
  let addr = this.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("           Web server listening on " + bind);
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
      from: "fu.market.2021@gmail.com",
      to: "manhcb10598@gmail.com",
      subject: "[Yêu Cầu Đặt Lại Mật Khẩu]",
      text: `Tên công ty: ${data.name}  `,
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

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}
