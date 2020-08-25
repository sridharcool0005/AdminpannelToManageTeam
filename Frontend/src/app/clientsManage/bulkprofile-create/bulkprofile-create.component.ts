import { Component, OnInit } from '@angular/core';
import { isArray } from 'util';
import * as XLSX from 'xlsx';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bulkprofile-create',
  templateUrl: './bulkprofile-create.component.html',
  styleUrls: ['./bulkprofile-create.component.scss']
})
export class BulkprofileCreateComponent implements OnInit {
  filteredJsonData;
  constructor(private apiCall: ApiCallService, private router: Router) { }

  ngOnInit() {
  }

  onFileChange(ev) {
    let workBook;
    let jsonData;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = () => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      if (isArray(jsonData.data)) {
        this.filteredJsonData = jsonData.data;
      }
    };
    reader.readAsBinaryString(file);
  }

  importdata() {
    const bulkData = { formdata: this.filteredJsonData };
    this.apiCall.createbulkcontacts(bulkData).subscribe((res: any) => {
      alert(res.message);
      this.router.navigate(['home'])
    })
  }

}
