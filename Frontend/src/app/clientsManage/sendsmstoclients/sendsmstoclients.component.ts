import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';

@Component({
  selector: 'app-sendsmstoclients',
  templateUrl: './sendsmstoclients.component.html',
  styleUrls: ['./sendsmstoclients.component.scss']
})
export class SendsmstoclientsComponent implements OnInit {
  client_ids: any;
  mobilenumbers: any;
 boolean=false;
  clientsData: any;
  constructor(private apiCall: ApiCallService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.mobilenumbers = this.route.snapshot.paramMap.get('mobilenumber');

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


}
