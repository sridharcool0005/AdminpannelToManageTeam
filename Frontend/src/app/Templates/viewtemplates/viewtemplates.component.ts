import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';
@Component({
  selector: 'app-viewtemplates',
  templateUrl: './viewtemplates.component.html',
  styleUrls: ['./viewtemplates.component.scss']
})
export class ViewtemplatesComponent implements OnInit {
  data: any;
  dataList: any;

  constructor(private apiCall: ApiCallService, private router: Router) { }

  ngOnInit() {
    this.getAllTemplateTypes()
  }

  getAllTemplateTypes(){
    this.apiCall.getAllTemplateTypes().subscribe((res:any)=>{
      this.data=res.data
    })
  }

  onChange(files: File[]) {
    if (files[0]) {
      console.log(files[0]);
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          console.log(result);
          this.dataList = result.data;
        }
      });
    }
  }

  uploadtemplates(){
    const data={data:this.dataList}
    this.apiCall.uploadtemplates(data).subscribe((res: any) => {
console.log(res)
    })
  }
}
