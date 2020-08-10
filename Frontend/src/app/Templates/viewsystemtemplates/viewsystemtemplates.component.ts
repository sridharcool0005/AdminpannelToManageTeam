import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewsystemtemplates',
  templateUrl: './viewsystemtemplates.component.html',
  styleUrls: ['./viewsystemtemplates.component.scss']
})
export class ViewsystemtemplatesComponent implements OnInit {
  message: any;
  event_code: string;

  constructor(private apiCall: ApiCallService,private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.event_code = this.route.snapshot.paramMap.get('event_code');
    this.getsmsTemplates();
  }
  getsmsTemplates(){
    const data={event_code:this.event_code}
    this.apiCall.getsmsTemplates(data).subscribe((res: any)=>{
      this.message=res.data;
      console.log(res)
    })
  }
}
