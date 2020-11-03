import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewdigitalcards',
  templateUrl: './viewdigitalcards.component.html',
  styleUrls: ['./viewdigitalcards.component.scss']
})
export class ViewdigitalcardsComponent implements OnInit {
  mobilenumber: string;

  constructor() { }

  ngOnInit() {

  }

  share(data) {
    console.log(data);
    const message ="this is test message";
        // Opening URL
    window.open('https://api.whatsapp.com/send?text='+ message +'&phone='+'+91'+this.mobilenumber);
    }
}

