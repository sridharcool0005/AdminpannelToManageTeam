import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userdata: any;
  newclients=0;
  newusersweekly=0;
  planexpirytdy=0;
  planexpiryweekly=0;

  constructor(private userService: ApiCallService, private router: Router) { }

  ngOnInit() {
    this.getclientscount();
    this.getuserdataCount();
    this.userdataCountweekly();
    this.getplanexpirytoday();
    this.getplanexpirynextweek()
  }


  getclientscount(){
    this.userService.getclientscount().subscribe((res: any)=>{
      this.userdata=res.result[0];
    })
  }
  getuserdataCount(){
    this.userService.getuserdataCount().subscribe((res: any)=>{
this.newclients=res.result[0].NumberOfclients;
console.log(this.newclients)
    })
  }


  userdataCountweekly(){
    this.userService.userdataCountweekly().subscribe((res: any)=>{
      this.newusersweekly=res.result[0].NumberOfclients;

          })
  }


  getplanexpirytoday(){
    this.userService.getplanexpirytoday().subscribe((res: any)=>{
      this.planexpirytdy=res.result[0].NumberOfclients;

          })
  }

  getplanexpirynextweek(){
    this.userService.getplanexpirynextweek().subscribe((res: any)=>{
      this.planexpiryweekly=res.result[0].NumberOfclients;

          })
  }

}
