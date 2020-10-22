import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { ExcelService } from 'src/app/apiCalls/excel.service';
import { isArray } from 'util';

@Component({
  selector: 'app-pushnotify',
  templateUrl: './pushnotify.component.html',
  styleUrls: ['./pushnotify.component.scss']
})
export class PushnotifyComponent implements OnInit {
  personList: any;
  smspackratecards: any;
  premiumpackratecards: any;
  premiumpacks: any;
  clientsData: any;
  message: any;

  constructor(private apiCall: ApiCallService, private router: Router, private excelservice: ExcelService) { }

  ngOnInit() {

    this.getrateCards();
    this.getPremiumRatecards();
    this.getMyContacts();
  }




  getrateCards() {
    this.apiCall.getrateCards().subscribe((res: any) => {
      console.log(res);
      this.smspackratecards = res.result;
    });
  }

  getpacksbyratecard(data) {
   const userData = {ratecard_id: data};
   this.apiCall.getpacksbyratecard(userData).subscribe((res: any) => {
      console.log(res);
      this.personList = res.result;
      this.premiumpacks = '';
      if(res.status=='false'){
       alert(res.message)
      }
    });

  }


  getPremiumRatecards() {
    this.apiCall.getPremiumRatecards().subscribe((res: any) => {
      console.log(res);
      this.premiumpackratecards = res.result;
    });

  }




  getPremiumpacksByRateCard(data) {
    const userData = {ratecard_id: data};
    this.apiCall.getPremiumpacksByRateCard(userData).subscribe((res: any) => {
       this.premiumpacks = res.result;
       this.personList = '';
     });

   }

   getMyContacts() {
    this.apiCall.client_idArray.subscribe((res: any = []) => {
     this.clientsData = res;
    });
  }

  confirmpackages(data) {
    data.userData = {clientdata: this.clientsData};
    this.apiCall.confirmpackage(data);
    this.router.navigate(['/sendnotify']);
  }
}

