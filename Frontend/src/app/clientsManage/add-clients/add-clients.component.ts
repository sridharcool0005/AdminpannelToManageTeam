import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.scss']
})
export class AddClientsComponent implements OnInit {
  model = {
    email: '',
    firstName:'',
    lastName:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  state: any;
  district: any;
  postoffice: any;
  professions: any;
  constructor(private apiCall: ApiCallService, private router: Router) { }

  ngOnInit() {
    this.fetchProfessions()
  }

  addnewClient(data) {
    this.apiCall.addnewClient(data).subscribe((res: any) => {
      console.log(res)
      if (res.status == "success") {
        alert('new client added Sucessfully')
      } else if (res.status == "error") {
        alert(res.message)
      }
    })
  }

  postofficeApi(data){
    const pincode={pinCode:data}
    this.apiCall.postofficeApi(pincode).subscribe((res: any)=>{
      console.log(res)
      this.state=res.state;
      this.district=res[0].district;
      this.postoffice=res[0].postoffice[0].postoffice

    })

  }

  fetchProfessions(){
    this.apiCall.fetchProfessions().subscribe((res: any)=>{
      this.professions=res;
      console.log(res);
    })
  }
}
