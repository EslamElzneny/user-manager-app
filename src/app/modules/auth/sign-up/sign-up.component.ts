import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  // initial variables
  signUpForm!:FormGroup;
  loadingSubmit:boolean = false;
  hide = true; // for password icon
  hide2 = true; // for confirm password icon

  constructor(private validationService: ValidationService,
    private router:Router,
    private _api:HttpService,
    private _auth: AuthService,
    private notificationService: NotificationsService,
    private errHandle: ErrorHandlingService){

  }

  ngOnInit(): void {


    this.signUpForm=new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern(this.validationService.alphaPattern)]),
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.pattern(this.validationService?.emailPattern),
      ]),
      phone_number:new FormControl('',[Validators.required,  Validators.maxLength(15),
        Validators.pattern(this.validationService.phonePattern)]),

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
      password_confirmation: new FormControl('', [Validators.required]),
    },
    { validators: this.validationService.matchingPasswords() }
    );


  }


  save(){
    if(this.signUpForm.valid && this.signUpForm.dirty){
      this.loadingSubmit = true;

      // ******* in case success response *****

      //save user data in local storage
      // let userObj = res?.data;
      // this._auth.setUserObj(userObj);
      //navigate
      // this.router.navigate(['/dashboard']);
      //show success notification
      // this.notificationService.success('', 'Registration has been successfully completed');
      //close loader
      // this.loadingSubmit = false;


      // ******* in case error response *****

      // this.errHandle.errorHandling(err);
      // this.loadingSubmit = false;

    }else{
      this.signUpForm.markAllAsTouched();
    }
  }



}
