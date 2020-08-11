import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewcards',
  templateUrl: './viewcards.component.html',
  styleUrls: ['./viewcards.component.scss']
})
export class ViewcardsComponent implements OnInit {
  cards: any;

  constructor(private apiCall: ApiCallService, private router: Router) { }

  ngOnInit() {
    this.getAllCards()
  }
  getAllCards(){
    this.apiCall.getAllCards().subscribe((res: any)=>{
      this.cards=res.data
    })
  }
}
