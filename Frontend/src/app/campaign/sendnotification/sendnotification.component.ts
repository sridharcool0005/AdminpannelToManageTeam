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

  constructor(private apiCall: ApiCallService, private router: Router,) { }

  ngOnInit() {
    this.getMyContacts();
  }

  getMyContacts() {
    this.apiCall.packArray.subscribe((res: any = []) => {
      this.client_ids = res.userData.clientdata.map(el => el.client_id);
      this.mobilenumbers = res.userData.clientdata.map(el => el.user_mobile_number);
      this.smspackage_ratecard = res.userData.smspackage_ratecard;
      this.premiumplan_ratecard  = res.userData.premiumplan_ratecard;
      console.log(this.premiumplan_ratecard,this.smspackage_ratecard)
    });
  }

  pushnotify(data) {
    data.client_ids = this.client_ids;
    data.mobilenumbers = this.mobilenumbers;
    data.smspackage_ratecard = this.smspackage_ratecard;
    data.premiumplan_ratecard = this.premiumplan_ratecard;
    console.log(data);
    if (this.boolean) {
      this.apiCall.sendpushnotification(data).subscribe((res: any) => {
        console.log(res);
        if (res.status == 'success') {
          alert(res.message);
          this.router.navigate(['/home']);
        }else{
          alert(res.message);

        }
      });
    }

    this.apiCall.sendPushnotifySMS(data).subscribe((res: any)=>{
      console.log(res);
      if(res.type=='success'){
        alert('sms sent successfully');
        this.router.navigate(['/home']);
      }
    })
  }

  checkbox(event) {
    console.log(event)
    this.boolean = event
  }
}
