const nodemailer = require("nodemailer");

module.exports = async (email) => {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "bhaveshchavan299@gmail.com",
      pass: "mtqjfczrevsxtkvp",
    },
  });
  var mailOptions = {
    from: "bhaveshchavhan299@gmail.com",
    to: email,
    subject: "Confirmation mail for Log-in",
    text: "Login Sucessfully !",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent to the registor EmailId");
    }
  });
};

