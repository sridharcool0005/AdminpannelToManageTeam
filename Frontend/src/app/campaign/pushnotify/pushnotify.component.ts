import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { ExcelService } from 'src/app/apiCalls/excel.service';

@Component({
  selector: 'app-pushnotify',
  templateUrl: './pushnotify.component.html',
  styleUrls: ['./pushnotify.component.scss']
})
export class PushnotifyComponent implements OnInit {
  personList: any;
  smspackratecards: any;
  premiumpackratecards: any;

  constructor(private apiCall: ApiCallService, private router: Router, private excelservice: ExcelService) { }

  ngOnInit() {
    this.getAllPackages();
    this.getrateCards();
    this.getPremiumRatecards();
  }


  getAllPackages() {
    this.apiCall.getAllPackages().subscribe((res: any) => {
      console.log(res);
      this.personList = res.data;
    });
  }

  getrateCards() {
    this.apiCall.getrateCards().subscribe((res: any) => {
      console.log(res);
      this.smspackratecards = res.result;
    });
  }

  getpacksbyratecard(data) {
   const userData = {ratecard_name: data};
   this.apiCall.getpacksbyratecard(userData).subscribe((res: any) => {
      console.log(res);
      this.personList = res.result;
    });
  }


  getPremiumRatecards() {
    this.apiCall.getPremiumRatecards().subscribe((res: any) => {
      console.log(res);
      this.premiumpackratecards = res.result;
    });
  }




  getPremiumpacksByRateCard(data) {
    const userData = {ratecard_name: data};
    this.apiCall.getPremiumpacksByRateCard(userData).subscribe((res: any) => {
       console.log(res);
       this.personList = res.result;
     });
   }
}

