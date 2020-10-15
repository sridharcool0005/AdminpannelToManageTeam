import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.scss']
})
export class AnalyticComponent implements OnInit {
  role: string;

  constructor( private userService: ApiCallService) { }

  ngOnInit() {
    this.role=this.userService.getRole()
  }

}
