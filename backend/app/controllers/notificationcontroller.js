var fetch = require('node-fetch');

module.exports.send_fcm_notifications= async function (req, res) { 
const {title, message,user_tokens}=req.body;
console.log(user_tokens)
// notification object with title and text
var notification = {
  'title':title,
  'text': message,
  'sound':'default',
//   'image':'./images/nutantek.jpg'
};

// fcm device tokens array
var fcm_tokens = user_tokens

var notification_body = {
    'notification': notification,
          'registration_ids': fcm_tokens
  }

fetch('https://fcm.googleapis.com/fcm/send', {
        'method': 'POST',
        'headers': {
          // replace authorization key with your key
          Authorization:  'key=' +'AAAAforQoAY:APA91bGNTuHwcE-IXp2U1KrePItpNfe2kBT3rj6WciQtSFuC7t7EAZgECb6US67tagjnv5L-IoZUFxCru7LQVLYUY1o-VJ79MWWzZFFKT4Gqrfxfd4eQropQ_wvUqCfD8aVMZ3cAc-i7',
          'Content-Type': 'application/json'
        },
         'body': JSON.stringify(notification_body)
      }).then(function(response) {
          // console.log(response)
        if(response.status=='200'){
          res.send({status:response.status,message:'Notification Sent  successfully'})

        }else{
          res.send({status:response.status,message:'Error in sending push notification'})

        }

    }).catch(function(error) {
        console.error(error);
      })
}