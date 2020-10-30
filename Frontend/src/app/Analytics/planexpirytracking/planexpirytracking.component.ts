import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { ExcelService } from 'src/app/apiCalls/excel.service';
import { FilterPipe} from './filter.pipe';

@Component({
  selector: 'app-planexpirytracking',
  templateUrl: './planexpirytracking.component.html',
  styleUrls: ['./planexpirytracking.component.scss']
})
export class PlanexpirytrackingComponent implements OnInit {
  public searchText : string;
  personList;
  editField: string;
  client_firstname: string;
  awaitingPersonList: Array<any> = [];
  selectedToppings = [];
  toppingList;
  allToppings = false;
  errorMessage: any;
  curDate = new Date();
  selectedclients: any[];
  partnerData: any;
  partner_id: string;
  constructor(private apiCall: ApiCallService, private excelservice: ExcelService,private router: Router) { }

  ngOnInit() {
    this.partner_id=this.apiCall.getPartner_id()
    this.getClients();
    this.getPartnerData();
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
   const partner_id ={partner_id:this.partner_id}
    this.apiCall.getplanexpirycontactsAll(partner_id).subscribe((res: any) => {
      this.personList = res.data;
    });
  }

  getPartnerData(){
    this.apiCall.getPartnerData().subscribe((res: any) =>{
      this.partnerData=res.result;
      console.log(this.partnerData)
    })
  }


  exportAsXLSX(): void {
    this.excelservice.exportAsExcelFile(this.personList, 'sample');
  }

  search() {
if (this.client_firstname !='') {
  this.personList = this.personList.filter(res => {
    return res.client_firstname.toLocaleLowerCase().match(this.client_firstname.toLocaleLowerCase());
  });
} else if (this.client_firstname == '') {
  this.ngOnInit();
}

  }

  getplanexpirycontacts(data) {
    data.partner_id=this.partner_id;
    this.apiCall.getplanexpirycontacts(data).subscribe((res: any) => {
      this.personList = res.data;
    });
  }

  updateclientData(data) {
    alert('Ensure you have added SMS balance to client account in SMS Gateway Portal');
    console.log(data);
    const userData = {client_id: data.client_id, order_id: data.order_id, add_balance: data.add_balance, payment_status: data.payment_status_code};
    this.apiCall.updatePaymentStatus(userData).subscribe((res: any) => {
    alert('Data updated Sucessfully');
    });

  }


  insertnotifications() {
    const agree = confirm('Are sure to add push notifications ?');
    if (agree) {
      const data = this.personList.map(person => person.client_id);
      const userData = { client_ids: data };
      this.apiCall.insertnotifications(userData).subscribe((res: any) => {
        alert(res.message);
      });
    }
  }

  getclientsbyfilter(value) {
    console.log(value);
    this.partner_id=value;
    const partner_id ={partner_id:this.partner_id}
    this.apiCall.getplanexpirycontactsAll(partner_id).subscribe((res: any) => {
      this.personList = res.data;

      if (value === 'All') {
        this.ngOnInit()
      }
    });
  }

  selectAllToppings(checked, toppings) {
    this.selectedToppings = toppings;
    if (checked) {
      this.allToppings = true;

      this.selectedclients = this.selectedToppings;
      console.log(this.selectedclients)
    } else {
      console.log(this.selectedToppings);
      this.allToppings = false;
    }
  }

  selectNewTopping(checked, topping) {
    if (checked) {
      this.selectedToppings.push(topping);
      this.selectedclients = this.selectedToppings;
      console.log(this.selectedclients)

    } else {
      this.selectedToppings = this.selectedToppings.filter(top => top.client_id !== topping.client_id);
    }
  }

  selectclients() {
    const notify=confirm("Are you sure you want to send notification");
    if(notify){
      this.apiCall.getclientids(this.selectedclients);
      this.router.navigate(['/sendpushnotification']);
    }

  }
}
