import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {

  constructor(private apiCall: ApiCallService,private router: Router) { }

  ngOnInit() {
  }
  add(data) {
    this.apiCall.addPackages(data).subscribe((res) =>{
      console.log(res)
      alert('Package added successfully')
      this.router.navigate(['/packageMange/ViewPacks']);
    })
  }


}
