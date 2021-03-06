import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { ExcelService } from 'src/app/apiCalls/excel.service';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-campaign-management',
  templateUrl: './campaign-management.component.html',
  styleUrls: ['./campaign-management.component.scss']
})
export class CampaignManagementComponent implements OnInit {
  public searchText: string;
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
  partner_id: any;

  constructor(private apiCall: ApiCallService, private excelservice: ExcelService, private router: Router) { }

  ngOnInit() {
    this.partner_id = this.apiCall.getPartner_id();
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
    const partner_id = { partner_id: this.partner_id }
    this.apiCall.getplanexpirycontactsAll(partner_id).subscribe((res: any) => {
      this.personList = res.data;
    });
  }



  exportAsXLSX(): void {
    this.excelservice.exportAsExcelFile(this.personList, 'Campaignmgmt_Clientslist');
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
    data.partner_id = this.partner_id;
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
    const agree = confirm('Are you sure to add push notifications ?');
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
    const data = { account_type: value };
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
    if (!this.selectedclients) {
      alert('Please select contacts to send push notification')
    }
    else if (this.selectclients) {
      const notify = confirm("Are you sure want to send push notification/Bulksms");
      if (notify) {
        this.apiCall.getclientids(this.selectedclients);
        this.router.navigate(['/pushnotify']);
      }
    }
  }
}
