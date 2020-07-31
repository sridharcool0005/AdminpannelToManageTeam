const nodemailer = require('nodemailer');
const Templates = require('../views/template');



var smtpTransport = nodemailer.createTransport({
     host: "smtp.gmail.com",//"mail.nutantek.com",
    port: 587,
    secure: false, // true for 465, false for other ports: gmail
    service: 'Gmail',
     auth: {
      user: 'lic.agentplus@gmail.com', //enter email id and password for testing
       pass:'Test@1234'
     },

});



var ActivationEmail = async function(toEmailId, templateType) {
  let mailOptions = {};
  mailOptions.to = toEmailId;

  let template = Templates(templateType);
  mailOptions.subject = template.subject;
  mailOptions.html = template.body;

  sendMail(mailOptions).then(() => {
    return;
  }).catch((err) => {
    throw err;
  })
}

const sendMail = async(mailOptions) => {
  await smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
        console.log("error in sendMail==", error);
        throw error
    } else {
        console.log("Message sent: " + response.response);
        return;
    }
});
}

module.exports = {
  
    ActivationEmail
};
