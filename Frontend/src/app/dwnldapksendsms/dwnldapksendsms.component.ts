import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../apiCalls/api-call.service';
@Component({
  selector: 'app-dwnldapksendsms',
  templateUrl: './dwnldapksendsms.component.html',
  styleUrls: ['./dwnldapksendsms.component.scss']
})
export class DwnldapksendsmsComponent implements OnInit {
  message;
  mobilenumber: any;

  constructor(private apiCall: ApiCallService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.mobilenumber = this.route.snapshot.paramMap.get('mobilenumber');
  }
  share(data) {
    console.log(data);
    const message = data.message;
        // Opening URL
    window.open('https://api.whatsapp.com/send?text='+ message +'&phone='+'+91'+this.mobilenumber);
    }


}
