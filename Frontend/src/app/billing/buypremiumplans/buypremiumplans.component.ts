import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';

@Component({
  selector: 'app-buypremiumplans',
  templateUrl: './buypremiumplans.component.html',
  styleUrls: ['./buypremiumplans.component.scss']
})
export class BuypremiumplansComponent implements OnInit {
editField: string;
  personList: Array<any> = [];

  awaitingPersonList: Array<any> = [];
  constructor(private apiCall: ApiCallService, private router: Router) { }

  ngOnInit() {
    this.getpremiumplanlist()
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

  getpremiumplanlist() {
    this.apiCall.getpremiumplanlist().subscribe((res: any) => {
      console.log(res);
      this.personList = res.data;
    })
  }

}
