import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/apiCalls/excel.service';
import { packages } from 'src/app/dataModel/packageModel';

@Component({
  selector: 'app-view-package',
  templateUrl: './view-package.component.html',
  styleUrls: ['./view-package.component.scss']
})
export class ViewPackageComponent implements OnInit {
  personList:packages[]=[];
  editField: string;

package_id: string;
  awaitingPersonList: Array<any> = [];

  constructor(private apiCall: ApiCallService,private router: Router, private excelservice: ExcelService) { }

  ngOnInit() {
    this.getAllPackages();
  }


  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
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

  exportAsXLSX():void {
    this.excelservice.exportAsExcelFile(this.personList, 'sample');
  }

  search(){
    if(this.package_id !=""){
      this.personList=this.personList.filter(res=>{
        return res.package_id.toLocaleLowerCase().match(this.package_id.toLocaleLowerCase());
      })

    }
    else if(this.package_id == ""){

      this.ngOnInit();
    }


      }
}
