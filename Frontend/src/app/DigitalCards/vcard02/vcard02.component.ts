import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vcard02',
  templateUrl: './vcard02.component.html',
  styleUrls: ['./vcard02.component.scss']
})
export class Vcard02Component implements OnInit {
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
