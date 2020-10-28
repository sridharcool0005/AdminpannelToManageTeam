import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
@Component({
  selector: 'app-sendbulksms',
  templateUrl: './sendbulksms.component.html',
  styleUrls: ['./sendbulksms.component.scss']
})
export class SendbulksmsComponent implements OnInit {
  client_ids: any;
  mobilenumbers: any;
 boolean=false;
  constructor(private apiCall: ApiCallService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
this.getMyContacts()
  }

  sendsms(data) {
    data.mobilenumbers = this.mobilenumbers;
    this.apiCall.sendPushnotifySMS(data).subscribe((res: any)=>{
      console.log(res);
      if(res.type=='success'){
        alert('sms sent successfully');
        this.router.navigate(['/home']);
      }
    })
  }

  getMyContacts() {
    this.apiCall.client_idArray.subscribe((res: any = []) => {
      this.mobilenumbers = res.map(el => el.user_mobile_number);
      console.log(this.mobilenumbers);
    });
  }

}
