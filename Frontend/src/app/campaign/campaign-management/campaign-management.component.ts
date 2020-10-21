import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { ExcelService } from 'src/app/apiCalls/excel.service';
@Component({
  selector: 'app-campaign-management',
  templateUrl: './campaign-management.component.html',
  styleUrls: ['./campaign-management.component.scss']
})
export class CampaignManagementComponent implements OnInit {
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

  constructor(private apiCall: ApiCallService, private excelservice: ExcelService, private router: Router) { }

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
    this.apiCall.getplanexpirycontactsAll().subscribe((res: any) => {

      this.personList = res.data;

    });
  }



  exportAsXLSX(): void {
    this.excelservice.exportAsExcelFile(this.personList, 'sample');
  }

  search() {
    if (this.client_firstname != '') {
      this.personList = this.personList.filter(res => {
        return res.client_firstname.toLocaleLowerCase().match(this.client_firstname.toLocaleLowerCase());
      });
    } else if (this.client_firstname == '') {
      this.ngOnInit();
    }

  }

  getplanexpirycontacts(data) {
    this.apiCall.getplanexpirycontacts(data).subscribe((res: any) => {
      this.personList = res.data;
    });
  }

  updateclientData(data) {
    alert('Ensure you have added SMS balance to client account in SMS Gateway Portal');
    console.log(data);
    const userData = { client_id: data.client_id, order_id: data.order_id, add_balance: data.add_balance, payment_status: data.payment_status_code };
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
    const data = { account_status: value };
    this.apiCall.getclientsbyfilter(data).subscribe((res: any) => {
      this.personList = res.data;
      if (res.status == 'false') {
        this.errorMessage = res.message;
      }
      if (value === 'All') {
        this.ngOnInit();
      }
    });
  }

  selectAllToppings(checked, toppings) {
    this.selectedToppings = toppings;
    if (checked) {
      this.allToppings = true;

      this.selectedclients = this.selectedToppings;
    } else {
      console.log(this.selectedToppings);
      this.allToppings = false;
    }
  }

  selectNewTopping(checked, topping) {
    if (checked) {
      this.selectedToppings.push(topping);
      this.selectedclients = this.selectedToppings;
    } else {
      this.selectedToppings = this.selectedToppings.filter(top => top.client_id !== topping.client_id);
    }
  }

  selectclients() {
    const notify=confirm("Are you sure you want to send notification");
    if(notify){
      this.apiCall.getclientids(this.selectedclients);
      this.router.navigate(['/pushnotify']);
    }

  }
}
