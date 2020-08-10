import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/apiCalls/api-call.service';
import { FormBuilder,FormGroup ,Validators} from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addtemplate-type',
  templateUrl: './addtemplate-type.component.html',
  styleUrls: ['./addtemplate-type.component.scss']
})
export class AddtemplateTypeComponent implements OnInit {

  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  users = [];
  constructor(private apiCall: ApiCallService,
    public fb: FormBuilder,
    public router: Router,) {

    this.form = this.fb.group({
      event_code: ['',Validators.required],
      avatar: [null,Validators.required],
      display_name:['',Validators.required]

    })
   }

  ngOnInit() {
  }


    // Image Preview
    uploadFile(event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({
        avatar: file
      });
      this.form.get('avatar').updateValueAndValidity()

      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      }
      reader.readAsDataURL(file)
    }

    submitForm() {
      this.apiCall.addtemplateType(
        this.form.value.event_code,
        this.form.value.display_name,
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
            alert('file uploaded sucessfully');
            this.router.navigate(['/templates/viewTemplates'])
        }
      })
    }

}
