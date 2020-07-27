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
  client_id: string;

  constructor(private apiCall: ApiCallService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.client_id = this.route.snapshot.paramMap.get('client_id');
    console.log(this.client_id)
    console.log(this.personList)
    this.getuserDetails()
  }
  getuserDetails(){
    const data={client_id:this.client_id}
    this.apiCall.getuserDetails(data).subscribe((res: any) =>{
      console.log(res)
      this.personList=res.data[0]
      console.log(this.personList)
    })
  }

}
