import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-templates',
  templateUrl: './add-templates.component.html',
  styleUrls: ['./add-templates.component.scss']
})
export class AddTemplatesComponent implements OnInit {
  events: any;

  constructor(private apiCall: ApiCallService,private router: Router) { }

  ngOnInit() {
    this.getevents();
  }
  add(data) {
    this.apiCall.addnewTemplate(data).subscribe((res:any)=>{
      if(res.status=='success'){
        alert(res.message)
        this.router.navigate(['/templates/viewTemplates'])
      }

    })

  }


  getevents(){
    this.apiCall.getevents().subscribe((res:any)=>{
      console.log(res)
      this.events=res.data;
    })
  }
}
