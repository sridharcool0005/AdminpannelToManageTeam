import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { ExcelService } from 'src/app/apiCalls/excel.service';

@Component({
  selector: 'app-pushnotify',
  templateUrl: './pushnotify.component.html',
  styleUrls: ['./pushnotify.component.scss']
})
export class PushnotifyComponent implements OnInit {
  personList: any;

  constructor(private apiCall: ApiCallService,private router: Router, private excelservice: ExcelService) { }

  ngOnInit() {
    this.getAllPackages()
  }

  getAllPackages(){
    this.apiCall.getAllPackages().subscribe((res: any)=>{
       console.log(res)
       this.personList=res.data
    })
      }
}
