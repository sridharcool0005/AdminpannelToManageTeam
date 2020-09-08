import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-paymentdetailsupdate',
  templateUrl: './paymentdetailsupdate.component.html',
  styleUrls: ['./paymentdetailsupdate.component.scss']
})
export class PaymentdetailsupdateComponent implements OnInit {

  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  users = [];
  category = 'C';
  package_id: any;
  clientData: any;
  message: any;
  TxnOrderId: any;
  authkey: any;
  constructor(private apiCall: ApiCallService,
              public fb: FormBuilder,
              public router: Router, private route: ActivatedRoute) {

    this.form = this.fb.group({
      payment_mode: ['', Validators.required],
      payment_gateway_txn_ref:['', Validators.required],
      payment_gateway_txn_id:['', Validators.required],
      client_id:['', Validators.required],
      authkey:['', Validators.required],
      TxnOrderId:['', Validators.required],
      avatar: [null, Validators.required],


    });
  }

  ngOnInit() {
    this.package_id = this.route.snapshot.params.package_id;
    console.log(this.package_id);

  }


  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submitForm() {
    this.apiCall.postPaymentTransaction(
      this.TxnOrderId,
      this.form.value.payment_mode,
      this.form.value.payment_gateway_txn_ref,
      this.form.value.payment_gateway_txn_id,
      this.clientData.client_id,
      this.authkey,
      this.form.value.avatar,
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          alert('Data saved sucessfully');
          this.router.navigate(['/billing/smspackagelist']);
      }
    });
  }

  getclientdetails(data) {

    this.apiCall.getclientdetails(data).subscribe((res: any) => {
      if (res.status == 'success') {
        this.clientData = res.data[0];
        this.authkey=this.clientData.user_authkey_old
        this.getOrderId();
      } else if (res.status == 'false') {
        this.message = res.message;
      }

    });
  }


  getOrderId() {
    const data = {package_id: this.package_id, client_id: this.clientData.client_id, sales_channel: 'smsportal', authkey: this.clientData.user_authkey_old};
    this.apiCall.getOrderId(data).subscribe((res: any) => {
     this.TxnOrderId = res.TxnOrderId;
     console.log(this.TxnOrderId);
    });
  }


}
