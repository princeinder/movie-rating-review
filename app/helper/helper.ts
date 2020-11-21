var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
export class Helper {
  static generateEncHash(param: any) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err: any, salt: string) {
        err && reject(err);
        bcrypt.hash(param, salt, function (err: any, hash: string) {
          err ? reject(err) : resolve(hash);
        });
      });
    });
  }

  static sendEmail(user: any, token: string) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.SENDGRID_USERNAME,
      to: user.email,
      subject: process.env.MAIL_SUBJECT,
      text:
        "Hello,\n\n" +
        "Please verify your account by clicking the link: \n" +
        process.env.HOSTNAME +
        "/confirmation/" +
        token +
        ".\n",
    };
    transporter.sendMail(mailOptions, function (err: any) {
      return err ? false : true;
    });
  }
}
