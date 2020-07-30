import { Component, OnInit } from '@angular/core';

import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { ExcelService } from 'src/app/apiCalls/excel.service';

@Component({
  selector: 'app-purchase-analysis',
  templateUrl: './purchase-analysis.component.html',
  styleUrls: ['./purchase-analysis.component.scss']
})
export class PurchaseAnalysisComponent implements OnInit {
  personList;
  editField: string;
  client_firstname:string;
  add_balance:string;
  awaitingPersonList: Array<any> = [];


  constructor(private apiCall: ApiCallService,private excelservice: ExcelService) { }

  ngOnInit() {
    this.getClients();
    console.log(status);

  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }



  getClients() {
    this.apiCall.getpurchaseData().subscribe((res: any) => {
      console.log(res)
      this.personList = res.data;
      console.log(this.personList)
    })
  }

  deleteclient(client_id, id) {
    const data={client_id:client_id}
    this.apiCall.deleteclient(data).subscribe((res: any) => {
      console.log(res);
      alert('User Deleted Sucessfully')
      this.remove(id);
    })
  }

  exportAsXLSX():void {
    this.excelservice.exportAsExcelFile(this.personList, 'sample');
  }

  search(){
if(this.client_firstname !=""){
  this.personList=this.personList.filter(res=>{
    return res.client_firstname.toLocaleLowerCase().match(this.client_firstname.toLocaleLowerCase());
  })

}
else if(this.client_firstname == ""){

  this.ngOnInit();
}


  }

  getpurchaseDataByDate(data){
    this.apiCall.getpurchaseDataByDate(data).subscribe((res: any) => {
      console.log(res)
      this.personList = res.data;
      console.log(this.personList)
    })
  }

  updateclientData(data){
    alert('Ensure you have added SMS balance to client account in SMS Gateway Portal')
    console.log(data)
    console.log(this.add_balance);
    const userData={client_id:data.client_id,order_id:data.order_id,add_balance:this.add_balance,payment_status:data.payment_status_code}
    this.apiCall.updatePaymentStatus(userData).subscribe((res: any)=>{
    alert('Data updated Sucessfully')
    })

  }

}
