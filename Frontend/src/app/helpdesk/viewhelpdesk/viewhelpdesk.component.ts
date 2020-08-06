import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/apiCalls/excel.service';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';

@Component({
  selector: 'app-viewhelpdesk',
  templateUrl: './viewhelpdesk.component.html',
  styleUrls: ['./viewhelpdesk.component.scss']
})
export class ViewhelpdeskComponent implements OnInit {
personList
  message: any;
  constructor(private excelservice: ExcelService,private apiCall: ApiCallService) { }

  ngOnInit() {
    this.gettickets();
  }
  exportAsXLSX():void {
    this.excelservice.exportAsExcelFile(this.personList, 'sample');
  }

  gettickets(){
this.apiCall.getAllTickets().subscribe((res: any)=>{
this.personList=res.data
})
  }

  getDataByQuery(data){

    this.apiCall.getDataByQuery(data).subscribe((res: any)=>{

this.personList = res.data
this.message=res.message;
    })
  }

  updateticketstatus(data){
    console.log(data)
    const userData={query_id:data.query_id,status:data.status}
    this.apiCall.updateticketstatus(userData).subscribe((res: any)=>{
    alert(res.message)
    })
  }
}
