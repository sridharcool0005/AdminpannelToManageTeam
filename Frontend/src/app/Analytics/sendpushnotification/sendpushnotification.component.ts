import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';

@Component({
  selector: 'app-sendpushnotification',
  templateUrl: './sendpushnotification.component.html',
  styleUrls: ['./sendpushnotification.component.scss']
})
export class SendpushnotificationComponent implements OnInit {
  client_ids: any;
  mobilenumbers: any;
 boolean=false;
  clientsData: any;
  constructor(private apiCall: ApiCallService, private router: Router,) { }

  ngOnInit() {
    this.getMyContacts();
  }

  getMyContacts() {
    this.apiCall.client_idArray.subscribe((res: any = []) => {
      this.client_ids = res.map(el => el.client_id);
      this.mobilenumbers = res.map(el => el.user_mobile_number);
    });
  }

  pushnotify(data) {
    data.client_ids = this.client_ids;
    data.mobilenumbers = this.mobilenumbers;
    console.log(data);
    if (this.boolean) {
      this.apiCall.insertnotifications(data).subscribe((res: any) => {
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
