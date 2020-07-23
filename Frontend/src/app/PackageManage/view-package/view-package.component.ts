import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-package',
  templateUrl: './view-package.component.html',
  styleUrls: ['./view-package.component.scss']
})
export class ViewPackageComponent implements OnInit {
  editField: string;
  personList: Array<any> = [];

  awaitingPersonList: Array<any> = [];

  constructor(private apiCall: ApiCallService,private router: Router) { }

  ngOnInit() {
    this.getAllPackages();
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  getAllPackages(){
this.apiCall.getAllPackages().subscribe((res: any)=>{
   console.log(res)
   this.personList=res.data
})
  }

  deletePackage(package_id,id){
    const data={package_id:package_id}
    this.apiCall.deletePackage(data).subscribe((res: any) => {
      console.log(res);
      alert('Package Deleted Sucessfully')
      this.remove(id);
    })
  }
}
