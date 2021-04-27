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
  dltcertificate
  to_date: any;
  from_date: any;
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
    const date =new Date()
    const title="BannerPromotions"+date
    this.excelservice.exportAsExcelFile(this.bannerdata,title );
  }

  getbannersdatabydate(data){
    this.from_date=data.from_date;
    this.to_date=data.to_date;
this.apicall.getbannersbydate(data).subscribe((res: any)=>{
  this.bannerdata=res.data;
})
  }

  updatedltstatus(status,order_id): void {
    const data={status:status,order_id:order_id,comments:this.bannerdatadetails.review_comments}
this.apicall.updatebannerpromotions(data).subscribe((res: any)=>{
alert(res.message);
this.getAllbannerpromotions()
})
  }

  getbannerpromotionsbystatus(status: string){
    if(!this.from_date||!this.to_date||!status){
      alert('plz select date range first')
    }else{
      const data={from_date:this.from_date,to_date:this.to_date,status:status}
      this.apicall.getbannerpromotionsbystatus(data).subscribe((res: any)=>{
        this.bannerdata=res.data;
      })
    }
    }

}
