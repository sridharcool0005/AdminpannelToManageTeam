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
  boolean = false;
  smspackage_ratecard: any;
  premiumplan_ratecard: any;
  user_tokens;

  constructor(private apiCall: ApiCallService, private router: Router,) { }

  ngOnInit() {
    this.getMyContacts();
  }

  getMyContacts() {
    this.apiCall.packArray.subscribe((res: any = []) => {
      const clientData = res.userData;
      if (clientData) {
        this.client_ids = clientData.clientdata.map(el => el.client_id);
        this.mobilenumbers = clientData.clientdata.map(el => Number(el.user_mobile_number));

      this.smspackage_ratecard =clientData.smspackage_ratecard;
      this.premiumplan_ratecard = clientData.premiumplan_ratecard;
      this.user_tokens = clientData.clientdata.map(el => el.fcm_token);

      }else{
        this.user_tokens = res.map(el => el.fcm_token);
        this.mobilenumbers = res.map(el => Number(el.user_mobile_number));


      }




    });
  }

  pushnotify(data) {
    data.client_ids = this.client_ids;
    data.mobilenumbers = this.mobilenumbers;
    data.smspackage_ratecard = this.smspackage_ratecard;
    data.premiumplan_ratecard = this.premiumplan_ratecard;
    data.user_tokens = this.user_tokens;

    if (this.boolean) {

      this.apiCall.sendpushnotification(data).subscribe((res: any) => {
        if (res.status == 'success') {
          this.router.navigate(['/campaignManage']);
        }else{
          alert(res.message);

        }
      });


    }
    this.apiCall.send_fcm_notifications(data).subscribe((res: any) => {
      alert(res.message)
    })
    this.apiCall.sendPushnotifySMS(data).subscribe((res: any)=>{

    })

  }

  checkbox(event) {
    console.log(event)
    this.boolean = event
  }
}
