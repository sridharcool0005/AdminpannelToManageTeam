import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.scss']
})
export class EditClientsComponent implements OnInit {
  client_id: string;
  userdata: any;


  constructor(private route: ActivatedRoute, private router: Router, private apiCall: ApiCallService) { }

  ngOnInit() {
    this.client_id = this.route.snapshot.paramMap.get('client_id');
    this.getuserDetails();
    console.log(this.userdata);
  }

  updateclientData(userData) {
    const yes = confirm('Are you sure want to update?');
    if (yes) {
      userData.client_id = this.client_id;
      const data = userData;
      this.apiCall.updateclientData(data).subscribe((res: any) => {

        alert(res.message);
        if (res) {
          this.sendSMS();
          this.activationEmail();
          this.router.navigate(['/client/viewclient']);
        }

          });
    }

  }


  getuserDetails() {
    const data = {client_id: this.client_id};
    this.apiCall.getuserDetails(data).subscribe((res: any) => {
    this.userdata = res.data;

    });
  }


  sendSMS() {
    const data = {mobile: this.userdata[0].user_mobile_number, message: 'Thank you for Registering to Nutan App.How to use: https://bit.ly/3bH0g1u Any help: whatsaap.me/918527317659 Connect us on for updates: facebook.com/nutanteksolutions/'};
    this.apiCall.sendSMS(data).subscribe((res: any) => {

    });
  }

  activationEmail() {
    const data = {email: this.userdata[0].user_email};
    this.apiCall.activationEmail(data).subscribe((res: any) => {

    });
  }


}
