import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import {ExcelService} from '../../apiCalls/excel.service';
import { clients } from 'src/app/dataModel/clentModel';
@Component({
  selector: 'app-viewclients',
  templateUrl: './viewclients.component.html',
  styleUrls: ['./viewclients.component.scss']
})
export class ViewclientsComponent implements OnInit {
  personList:clients[]=[];
  editField: string;
   client_id:string;

  awaitingPersonList: Array<any> = [];
  clientsdata: any;

  constructor(private apiCall: ApiCallService,private excelservice: ExcelService) { }

  ngOnInit() {

    this.getClients();
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
if(this.client_id !=""){
  this.personList=this.personList.filter(res=>{
    return res.client_id.toLocaleLowerCase().match(this.client_id.toLocaleLowerCase());
  })

}
else if(this.client_id == ""){

  this.ngOnInit();
}


  }
}
