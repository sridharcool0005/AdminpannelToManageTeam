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
  bannerdata: any=[];
  bannerdatadetails:any=[];
  notes;
  dltcertificate
  constructor(private apicall: ApiCallService, private excelservice: ExcelService, private router: Router) { }


  ngOnInit() {
    this.getAllbannerpromotions()
  }

  getAllbannerpromotions(){
    this.apicall.getAllbannerpromotions().subscribe((res: any)=>{
console.log(res);
this.bannerdata=res.data;

    })
  }

  getpromotiondatadetailed(order_id){
    const data={order_id:order_id}
    this.apicall.getpromotiondatadetailed(data).subscribe((res: any)=>{
      console.log(res);
      this.bannerdatadetails=res.data[0];

          })
  }

  exportAsXLSX(): void {
    this.excelservice.exportAsExcelFile(this.bannerdata, 'DLTTemplates');
  }

  getdltlist(){

  }

  updatedltstatus(status,order_id): void {
    const data={status:status,order_id:order_id,comments:this.notes}
this.apicall.updatebannerpromotions(data).subscribe((res: any)=>{
alert(res.message);
this.getAllbannerpromotions()
})
  }
}
