import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-sendnotification',
  templateUrl: './sendnotification.component.html',
  styleUrls: ['./sendnotification.component.scss']
})
export class SendnotificationComponent implements OnInit {
  client_ids: any;
  mobilenumbers: any;
  ratecard_id: any;
  boolean = false;
  smspackage_ratecard: any;
  premiumplan_ratecard: any;
  user_tokens;
  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  constructor(private apiCall: ApiCallService, private router: Router, public fb: FormBuilder) {
    this.form = this.fb.group({
      avatar: [null, Validators.required],
      image: [null, Validators.required],

    })
  }

  ngOnInit() {
    this.getMyContacts();
  }

  getMyContacts() {
    this.apiCall.packArray.subscribe((res: any = []) => {
      const clientData = res.userData;
      if (clientData) {
        this.client_ids = clientData.clientdata.map(el => el.client_id);
        this.mobilenumbers = clientData.clientdata.map(el => Number(el.user_mobile_number));
        this.smspackage_ratecard = clientData.smspackage_ratecard;
        this.premiumplan_ratecard = clientData.premiumplan_ratecard;
        this.user_tokens = clientData.clientdata.map(el => el.fcm_token);

      } else {
        this.client_ids = res.map(el => el.client_id);
        this.user_tokens = res.map(el => el.fcm_token);
        this.mobilenumbers = res.map(el => Number(el.user_mobile_number));
      }
    });
  }

  pushnotify(data) {
    data.client_ids = this.client_ids;
    data.mobilenumbers = this.mobilenumbers;
    data.smspackage_ratecard = this.smspackage_ratecard;
    data.premiumplan_ratecard = this.premiumplan_ratecard;
    data.user_tokens = this.user_tokens;

    if (this.boolean) {
      this.apiCall.send_fcm_notifications(data).subscribe((res: any) => {
        alert(res.message)
        this.router.navigate(['campaignManage'])
      })
      this.submitForm();
      this.uplaodimagefile();

    } else {

      this.apiCall.sendPushnotifySMS(data).subscribe((res: any) => {
        alert('Bulksms sent successfully');
        this.router.navigate(['campaignManage'])
      })
    }


  }

  checkbox(event) {
    console.log(event)
    this.boolean = event
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
    }
    reader.readAsDataURL(file)
  }

    // Image Preview
    uploadimagefile(event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({
        image: file
      });
      this.form.get('image').updateValueAndValidity();
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      }
      reader.readAsDataURL(file)
    }

  submitForm() {
    this.apiCall.uploadaudiofile(
      this.form.value.avatar
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
      }
    })
  }

  uplaodimagefile() {
    this.apiCall.imagefileupload(
      this.form.value.image
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
      }
    })
  }
}

