import { Component, OnInit } from '@angular/core';
import { clients } from 'src/app/dataModel/clentModel';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { ExcelService } from 'src/app/apiCalls/excel.service';

@Component({
  selector: 'app-purchase-analysis',
  templateUrl: './purchase-analysis.component.html',
  styleUrls: ['./purchase-analysis.component.scss']
})
export class PurchaseAnalysisComponent implements OnInit {
  personList:clients[]=[];
  editField: string;
  client_firstname:string;

  awaitingPersonList: Array<any> = [];
  clientsdata: any;

  constructor(private apiCall: ApiCallService,private excelservice: ExcelService) { }

  ngOnInit() {

    this.getClients();
    console.log(status)
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
    this.apiCall.getClients().subscribe((res: any) => {
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

}
