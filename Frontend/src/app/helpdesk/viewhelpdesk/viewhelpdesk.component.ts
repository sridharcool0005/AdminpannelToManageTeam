import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/apiCalls/excel.service';

@Component({
  selector: 'app-viewhelpdesk',
  templateUrl: './viewhelpdesk.component.html',
  styleUrls: ['./viewhelpdesk.component.scss']
})
export class ViewhelpdeskComponent implements OnInit {
personList
  constructor(private excelservice: ExcelService) { }

  ngOnInit() {
  }
  exportAsXLSX():void {
    this.excelservice.exportAsExcelFile(this.personList, 'sample');
  }

  gettickets(){

  }
}
