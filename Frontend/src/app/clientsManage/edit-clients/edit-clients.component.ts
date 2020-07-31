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

  constructor(private route: ActivatedRoute,private router: Router,private apiCall: ApiCallService) { }

  ngOnInit() {
    this.client_id = this.route.snapshot.paramMap.get('client_id');
    this.getuserDetails();
  console.log(this.userdata)
  }

  updateclientData(userData) {
userData.client_id = this.client_id;
const data = userData;
this.apiCall.updateclientData(data).subscribe((res: any) => {
  if(res){
    this.sendSMS();
    alert(res.message)
    this.router.navigate(['/client/viewclient'])
  }

    });
  }


  getuserDetails() {
    const data = {client_id: this.client_id};
    this.apiCall.getuserDetails(data).subscribe((res: any) => {
    this.userdata = res.data;
    console.log(this.userdata[0],'user')
    });
  }


  sendSMS(){
    const data={mobile:this.userdata[0].user_mobile_number,message:'Your Account is Activated sucessfully'}

    this.apiCall.sendSMS(data).subscribe((res: any) =>{

    })
  }
}
