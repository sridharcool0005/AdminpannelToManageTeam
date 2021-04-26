import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../../apiCalls/api-call.service';
import { ExcelService } from '../../apiCalls/excel.service';
@Component({
  selector: 'app-be-ontop-promotion',
  templateUrl: './be-ontop-promotion.component.html',
  styleUrls: ['./be-ontop-promotion.component.scss']
})
export class BeOntopPromotionComponent implements OnInit {
  dltlist: any;
  constructor(private apicall: ApiCallService, private excelservice: ExcelService, private router: Router) { }


  ngOnInit() {
  }

  exportAsXLSX(): void {
    this.excelservice.exportAsExcelFile(this.dltlist, 'DLTTemplates');
  }

}
