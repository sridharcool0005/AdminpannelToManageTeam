import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-updatepremiumplan',
  templateUrl: './updatepremiumplan.component.html',
  styleUrls: ['./updatepremiumplan.component.scss']
})
export class UpdatepremiumplanComponent implements OnInit {
  packageDetails: any;
  package_id: string;

  constructor(private apiCall: ApiCallService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.package_id = this.route.snapshot.paramMap.get('package_id');
    this.getPackageDetails()
  }
  getPackageDetails() {
    const data = { package_id: this.package_id }
    this.apiCall.getpremiumplandetails(data).subscribe((res: any) => {
      this.packageDetails = res.data
    })
  }


  updatePackage(packData) {
    packData.package_id = this.package_id;
    this.apiCall.updatePremiumPlan(packData).subscribe((res: any) => {
      console.log(res)
      if (res.code == '200') {
        alert(res.success)
        this.router.navigate(['/packagemanagement']);
      }

    })
  }
}
