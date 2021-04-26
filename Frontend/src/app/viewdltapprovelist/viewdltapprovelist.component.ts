import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../apiCalls/api-call.service';
import { ExcelService } from '../apiCalls/excel.service';

@Component({
  selector: 'app-viewdltapprovelist',
  templateUrl: './viewdltapprovelist.component.html',
  styleUrls: ['./viewdltapprovelist.component.scss']
})
export class ViewdltapprovelistComponent implements OnInit {
  dltlist: any;
  documentdetails: any;
  client_id: any;
  tid: any;
  notes="Reviewed the certificate and found okay. Approved";
  dltcertificate: any;

  constructor(private apicall: ApiCallService, private excelservice: ExcelService, private router: Router) { }

  ngOnInit() {
    this.getdltcumulativelist()
  }

  getdltcumulativelist(){
    this.apicall.getdltcumulativelist().subscribe((res:any)=>{
      this.dltlist=res.data
    },err=>{
alert(err.error.message)
    })
  }

  getdltlist(data){
    this.apicall.getdltlist(data).subscribe((res:any)=>{
      console.log(res)
      this.dltlist = res.data
    },err=>{
      alert(err.error.message)
          })
  }




  getdltdocmentdetails(tid,client_id){
    const data={tid:tid,client_id:client_id}
this.tid=tid;
this.client_id=client_id;
    this.apicall.getdltdocmentdetails(data).subscribe((res: any)=>{
      this.documentdetails = res.data[0]
    })
    this.getdltcertificate(tid)
  }


  exportAsXLSX(): void {
    this.excelservice.exportAsExcelFile(this.dltlist, 'DLTTemplates');
  }


  updatedltstatus(status){
    const data={tid: this.tid,client_id: this.client_id,message:this.notes,status:status}
    this.apicall.updatedltstatus(data).subscribe((res: any)=>{
      if(res.status=='success'){
        alert(res.message);
        this.getdltcumulativelist()

      }
    })
  }

  getdltcertificate(tid){
    const data={tid:tid,client_id: this.client_id}
    this.apicall.getdltcertificate(data).subscribe((res: any)=>{
      this.dltcertificate = res;
    })
  }
}
