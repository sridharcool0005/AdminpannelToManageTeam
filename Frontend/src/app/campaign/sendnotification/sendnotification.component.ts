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

  constructor(private apiCall: ApiCallService, private router: Router,) { }

  ngOnInit() {
    this.getMyContacts();
  }

  getMyContacts() {
    this.apiCall.packArray.subscribe((res: any = []) => {
      this.ratecard_id = res[0].ratecard_id;
      this.client_ids = res.userData.clientdata.map(el => el.client_id);
      this.mobilenumbers = res.userData.clientdata.map(el => el.user_mobile_number);

    });
  }

  pushnotify(data) {

    data.ratecard_id = this.ratecard_id;
    data.client_ids = this.client_ids;
    data.mobilenumbers = this.mobilenumbers;
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
