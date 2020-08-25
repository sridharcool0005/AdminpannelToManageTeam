import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewapks',
  templateUrl: './viewapks.component.html',
  styleUrls: ['./viewapks.component.scss']
})
export class ViewapksComponent implements OnInit {
  apkdata: any;
  message: any;

  constructor(private apicall: ApiCallService, private router: Router) { }

  ngOnInit() {
    this.getallapkslist()
  }

  getallapkslist() {
    this.apicall.getallapkslist().subscribe((res: any) => {

      this.apkdata = res.data;
      this.message=res.message;

    })
  }

  deleteapk(data) {
    const apk_id={apk_id:data}
    const userconfirm = confirm('Are you sure you want to delete ?')
    if (userconfirm) {
      this.apicall.deleteapk(apk_id).subscribe((res: any) => {
        alert(res.success);

        this.getallapkslist()
      })
    } else {


    }

  }
}
