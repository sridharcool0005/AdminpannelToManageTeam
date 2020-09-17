import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { ExcelService } from '../../apiCalls/excel.service';
import { FilterPipe} from './filter.pipe';

@Component({
  selector: 'app-viewclients',
  templateUrl: './viewclients.component.html',
  styleUrls: ['./viewclients.component.scss']
})
export class ViewclientsComponent implements OnInit {
  public searchText : string;
  personList;
  editField: string;
  client_firstname: string;

  awaitingPersonList: Array<any> = [];
  clientsdata: any;
  accountStatus: any;
  errorMessage: any;

  constructor(private apiCall: ApiCallService, private excelservice: ExcelService) { }

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
    const yes = confirm('Are you sure want to Delete?');
    if(yes){
    const data = { client_id: client_id }
    this.apiCall.deleteclient(data).subscribe((res: any) => {
      console.log(res);
      alert('User Deleted Sucessfully')
      this.remove(id);
    })
  }
  }

  exportAsXLSX(): void {
    this.excelservice.exportAsExcelFile(this.personList, 'sample');
  }




  updatestatus(person) {
    const yes = confirm('Are you  sure want to change the status?');
    if (yes) {
      const data = { account_status: person.account_status, client_id: person.client_id, user_regn_channel: person.user_regn_channel }
      console.log(data)

      this.apiCall.updateclientStatus(data).subscribe((res: any) => {
        if (res.status == 'true') {
          alert(res.message)
        } else if (res.status == 'false') {
          alert(res.message)
        }

      })
    }
  }


  getclientsbyfilter(value) {
    console.log(value)
    const data = { account_status: value }
    this.apiCall.getclientsbyfilter(data).subscribe((res: any) => {
      this.personList = res.data;
      if (res.status == "false") {
        this.errorMessage = res.message
      }
      if (value === 'All') {
        this.ngOnInit()
      }
    })
  }


}
