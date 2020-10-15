import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../app/changepassword/must-match';
import { ApiCallService } from '../apiCalls/api-call.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  public password = " ";
  public confirmPassword ="";
  model:any=[];
   registerForm: FormGroup;
   submitted = false;
   constructor(private apicall: ApiCallService, private formBuilder: FormBuilder, private router: Router) { }

   ngOnInit() {
     this.registerForm = this.formBuilder.group({
       password: ['', [Validators.required, Validators.minLength(6)]],
       confirmPassword: ['', Validators.required]
   }, {
       validator: MustMatch('password', 'confirmPassword')
   });

   }

   get f() { return this.registerForm.controls; }
     changePassword() {

       this.submitted = true;
       console.log();
       if (this.registerForm.invalid) {
         return;
     }
     console.log(this.registerForm.value)
       this.apicall.resetPassword(this.registerForm.value).subscribe((res: any) => {
       console.log(res);

       if (res.status === 'success') {
         alert(res.message);
         this.router.navigateByUrl('home');
       } else {

       }
     });

   }

}
