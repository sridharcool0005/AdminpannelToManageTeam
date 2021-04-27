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
  beondata: any;
  documentdetails: any;
  notes;
  from_date: any;
  to_date: any;
  constructor(private apicall: ApiCallService, private excelservice: ExcelService, private router: Router) { }


  ngOnInit() {
    this.getallbeontopdata()
  }

  exportAsXLSX(): void {
    const date =new Date()
    const title="BeOnTopPromotions"+date
    this.excelservice.exportAsExcelFile(this.beondata,title );
  }
  getallbeontopdata(){
    this.apicall.getallbeontopdata().subscribe((res: any)=>{
      this.beondata=res.data;
    })
  }


  getbeondatadetailed(order_id){
    const data={order_id:order_id}
    this.apicall.getbeondatadetailed(data).subscribe((res: any)=>{
      console.log(res);
      this.documentdetails=res.data[0];

          })
  }

  updatedltstatus(status,order_id): void {
    const data={status:status,order_id:order_id,comments:this.documentdetails.review_comments}
this.apicall.updatebeontopstatus(data).subscribe((res: any)=>{
alert(res.message);
this.getallbeontopdata()
})
  }

  getbeonbydate(data){
    this.from_date=data.from_date;
    this.to_date=data.to_date;
this.apicall.getbeonbydate(data).subscribe((res: any)=>{
  this.beondata=res.data;
})
  }


  getbeondatabystatus(status: string){
    if(!this.from_date||!this.to_date||!status){
      alert('plz select date range first')
    }else{
      const data={from_date:this.from_date,to_date:this.to_date,status:status}
      this.apicall.getbeondatabystatus(data).subscribe((res: any)=>{
        this.beondata=res.data;
      })
    }
    }
}
