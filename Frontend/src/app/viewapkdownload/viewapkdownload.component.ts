import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../apiCalls/api-call.service';
import { ExcelService } from 'src/app/apiCalls/excel.service';
@Component({
  selector: 'app-viewapkdownload',
  templateUrl: './viewapkdownload.component.html',
  styleUrls: ['./viewapkdownload.component.scss']
})
export class ViewapkdownloadComponent implements OnInit {
  personList;

  constructor(private apiCall: ApiCallService, private router: Router,private excelservice: ExcelService) { }

  ngOnInit() {
    this.getallapkDownloadlist()
  }


getallapkDownloadlist(){
  this.apiCall.getallapkDownloadlist().subscribe((res:any) =>{
    console.log(res)
    this.personList= res.result
  })
}
exportAsXLSX(): void {
  this.excelservice.exportAsExcelFile(this.personList, 'sample');
}

}
