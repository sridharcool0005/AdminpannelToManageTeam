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
  constructor(private apiCall: ApiCallService, private router: Router) { }

  ngOnInit() {
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
}
