import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewtemplates',
  templateUrl: './viewtemplates.component.html',
  styleUrls: ['./viewtemplates.component.scss']
})
export class ViewtemplatesComponent implements OnInit {
  data: any;

  constructor(private apiCall: ApiCallService, private router: Router) { }

  ngOnInit() {
    this.getAllTemplateTypes()
  }

  getAllTemplateTypes(){
    this.apiCall.getAllTemplateTypes().subscribe((res:any)=>{
      this.data=res.data
    })
  }
}
