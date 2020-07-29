import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-detailed',
  templateUrl: './purchase-detailed.component.html',
  styleUrls: ['./purchase-detailed.component.scss']
})
export class PurchaseDetailedComponent implements OnInit {
  personList: any;
  order_id: string;
  package_id: string;

  constructor(private apiCall: ApiCallService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('order_id');
    this.package_id=this.route.snapshot.paramMap.get('package_id');
    console.log(this.personList)
    this.getuserDetails()
  }
  getuserDetails(){
    const data={order_id:this.order_id,package_id:this.package_id};
    this.apiCall.getpurchaseDetailed(data).subscribe((res: any) =>{
      console.log(res)
      this.personList=res.data[0]
      console.log(this.personList)
    })
  }

}
