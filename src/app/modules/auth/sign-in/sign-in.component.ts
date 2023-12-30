import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

   // initial variables
   signInForm!:FormGroup;
   loadingSubmit:boolean = false;
   hide = true; // for password icon

   constructor(private validationService: ValidationService,
     private router:Router,
     private _api:HttpService,
     private _auth: AuthService,
     private notificationService: NotificationsService,
     private errHandle: ErrorHandlingService){

   }

   ngOnInit(): void {


     this.signInForm=new FormGroup({
       email: new FormControl('', [
         Validators.email,
         Validators.required,
         Validators.pattern(this.validationService?.emailPattern),
       ]),

       password: new FormControl(
         '',
         Validators.compose([
           Validators.required,
           Validators.minLength(8),
           Validators.maxLength(35),
           // accept two arguments pattern style and error message
           this.validationService.patternValidator(
             this.validationService.passwordCapitalLetterPatter,
             { notHasCapitalCase: true }
           ),
           this.validationService.patternValidator(
             this.validationService.passwordSmallLetterPatter,
             { notHasSmallCase: true }
           ),
           this.validationService.patternValidator(
             this.validationService.passwordNumbersPattern,
             { notHasNumber: true }
           ),
           this.validationService.patternValidator(
             this.validationService.passwordSpecialCharPattern,
             { notHasSpecialCharacters: true }
           ),
         ])
       ),
     });


   }


   save(){
     if(this.signInForm.valid && this.signInForm.dirty){
       this.loadingSubmit = true;

       // ******* in case success response *****

       //save user data in local storage
       // let userObj = res?.data;
       // this._auth.setUserObj(userObj);
       //navigate
       // this.router.navigate(['/dashboard']);
       //show success notification
       // this.notificationService.success('', 'Login has been successfully completed');
       //close loader
       // this.loadingSubmit = false;


       // ******* in case error response *****

       // this.errHandle.errorHandling(err);
       // this.loadingSubmit = false;

     }else{
       this.signInForm.markAllAsTouched();
     }
   }

}
