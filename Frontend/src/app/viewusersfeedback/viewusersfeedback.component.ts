import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../apiCalls/api-call.service';
import { ExcelService } from '../apiCalls/excel.service';
@Component({
  selector: 'app-viewusersfeedback',
  templateUrl: './viewusersfeedback.component.html',
  styleUrls: ['./viewusersfeedback.component.scss']
})
export class ViewusersfeedbackComponent implements OnInit {
  personList;

  constructor(private apiCall: ApiCallService, private router: Router,private excelservice: ExcelService) { }

  ngOnInit() {
    this.getusersfeedbackqueries()
  }


  getusersfeedbackqueries(){
  this.apiCall.getusersfeedbackqueries().subscribe((res:any) =>{
    console.log(res)
    this.personList= res.result
  })
}
exportAsXLSX(): void {
  this.excelservice.exportAsExcelFile(this.personList, 'sample');
}
}
