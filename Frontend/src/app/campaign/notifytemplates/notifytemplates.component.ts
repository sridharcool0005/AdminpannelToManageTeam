import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifytemplates',
  templateUrl: './notifytemplates.component.html',
  styleUrls: ['./notifytemplates.component.scss']
})
export class NotifytemplatesComponent implements OnInit {
  message=[]
  constructor() { }

  ngOnInit() {
    this.message = [{message:'May this Dasara, light up for you. The hopes of Happy times, And dreams for a year full of smiles! Wish you all Happy Vijaya Dashami'},
  {message:'May this Dasara, light up for you. The hopes of Happy times, And dreams for a year full of smiles! Wish you all Happy Vijaya Dashami'}
  ]
  }

}
