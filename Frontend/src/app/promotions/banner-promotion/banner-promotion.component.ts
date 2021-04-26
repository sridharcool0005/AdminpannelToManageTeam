import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../../apiCalls/api-call.service';
import { ExcelService } from '../../apiCalls/excel.service';
@Component({
  selector: 'app-banner-promotion',
  templateUrl: './banner-promotion.component.html',
  styleUrls: ['./banner-promotion.component.scss']
})
export class BannerPromotionComponent implements OnInit {
  dltlist: any;
  constructor(private apicall: ApiCallService, private excelservice: ExcelService, private router: Router) { }


  ngOnInit() {
  }

  exportAsXLSX(): void {
    this.excelservice.exportAsExcelFile(this.dltlist, 'DLTTemplates');
  }

}
