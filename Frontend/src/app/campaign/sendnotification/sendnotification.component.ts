import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';

@Component({
  selector: 'app-sendnotification',
  templateUrl: './sendnotification.component.html',
  styleUrls: ['./sendnotification.component.scss']
})
export class SendnotificationComponent implements OnInit {
  client_ids: any;
  mobilenumbers: any;
  ratecard_id: any;
  boolean=false;
  smspackage_ratecard: any;
  premiumplan_ratecard: any;
  user_tokens;

  constructor(private apiCall: ApiCallService, private router: Router,) { }

  ngOnInit() {
    this.getMyContacts();
  }

  getMyContacts() {
    this.apiCall.packArray.subscribe((res: any = []) => {
      console.log(res)
      this.client_ids = res.userData.clientdata.map(el => el.client_id);
      this.user_tokens = res.map(el => el.fcm_token);
      console.log(this.user_tokens)
      this.mobilenumbers = res.userData.clientdata.map(el =>Number( el.user_mobile_number));
      this.smspackage_ratecard = res.userData.smspackage_ratecard;
      this.premiumplan_ratecard  = res.userData.premiumplan_ratecard;
    });
  }

  pushnotify(data) {
    data.client_ids = this.client_ids;
    data.mobilenumbers = this.mobilenumbers;
    data.smspackage_ratecard = this.smspackage_ratecard;
    data.premiumplan_ratecard = this.premiumplan_ratecard;
    data.user_tokens = this.user_tokens;
    console.log(data);

    this.apiCall.send_fcm_notifications(data).subscribe((res: any)=>{
alert(res.message)
    })
    // this.apiCall.sendPushnotifySMS(data).subscribe((res: any)=>{
    //   console.log(res);
    //   if(res.type=='success'){
    //     alert('sms sent successfully');
    //     this.router.navigate(['/home']);
    //   }
    // })
    // if (this.boolean) {
    //   this.apiCall.sendpushnotification(data).subscribe((res: any) => {
    //     console.log(res);
    //     if (res.status == 'success') {
    //       alert(res.message);
    //       this.router.navigate(['/campaignManage']);
    //     }else{
    //       alert(res.message);

    //     }
    //   });
    // }



  }

  checkbox(event) {
    console.log(event)
    this.boolean = event
  }
}
