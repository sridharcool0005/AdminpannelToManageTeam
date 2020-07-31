const CONST = require('../constants/constant');



var templates = function(templateType, options) {
 

    switch(templateType) {
       
            case CONST.activationEmail:
              return accountActivationEmail(options);
    }
}

/**
 * @param {*} options
 * agentName, doName
 */




function accountActivationEmail (){
  console.log('email template')
 
   const subject = ' Congrates! Your Account is Activated successfully for  Autosms'
  const body =
  `<html>
  <body>
  <h4>
  Greetings from NutanTek Solutions!

  Congratulations Your Account is  Activated for autosms
<br>

For any queries/technical support, do write / ping us on:-<br>
<br>
Email     : agentplus@nutantek.com<br>
Telegram  : @agentplus<br>
WhatsApp: 91 770 2000 723<br>
<br><br>
You can also submit your query/requirements through Contact us Form.

Look forward to serve you to enable your business.
  </h4>
  </body>
  <footer>
  Best Wishes!<br>
AgentPlus Team<br>
NutanTek Solutions LLP<br>
http://agentplus.nutantek.com
  </footer>
  </html>`;

  return { subject: subject, body: body, };
}

module.exports = templates;
