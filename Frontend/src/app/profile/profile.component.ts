import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../apiCalls/api-call.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails;
  constructor(private userService: ApiCallService, private router: Router ) { }


  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails)
      },
      err => {
        console.log(err);

      }
    );
  }


}
