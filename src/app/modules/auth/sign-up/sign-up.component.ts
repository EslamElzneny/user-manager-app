import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Account, FirestoreService } from 'src/app/core/services/firestore.service';
import { MetaDataService } from 'src/app/core/services/meta-data/meta-data.service';

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
    private _fireAuth:AngularFireAuth,
    private router:Router,
    private _fireStore:FirestoreService,
    private _auth: AuthService,
    private _metaService:MetaDataService,
    private notificationService: NotificationsService,
    private errHandle: ErrorHandlingService){
      _metaService.updatePageTitle('Sign Up | User Manager App');
      this._metaService.updateMetaData('Sign Up | User Manager App',"User management systems allow administrators to manage users' access to devices, software, and services. This includes managing permissions, monitoring usage, and providing authenticated access. User management is a core part of Identity and Access Management",'https://user-manager-app.vercel.app/assets/images/logo.webp')
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
      this._fireAuth.createUserWithEmailAndPassword(
        this.signUpForm.value.email,this.signUpForm.value.password
      ).then(res=>{


        let accountInfo:Account = {
          id:'',uid: res?.user?.uid ,
          name: this.signUpForm.value.name,
          phone: this.signUpForm.value.phone_number,
        }

        // store reset data to fireStore
        this._fireStore.addAccount(accountInfo).then((data:any)=>{
          // ******* in case success response *****
          this.sendEmailForVerification(res?.user);
        })

      }).catch(err=>{
        // ******* in case error response *****
        this.errHandle.errorHandling(err);
        this.loadingSubmit = false;
      })



    }else{
      this.signUpForm.markAllAsTouched();
    }
  }


  sendEmailForVerification(user:any){

    user?.sendEmailVerification().then((res:any)=>{
      //show success notification
      this.notificationService.success('','Please Check Your Email!')
      this.router.navigate(['/auth/verify-email']);
    }).catch((err:any)=>{
      // ******* in case error response *****
      this.errHandle.errorHandling(err);
      this.loadingSubmit = false;
    })

  }



}

/* normal case without verification email */

  // //save user data in local storage
  // let userObj:any = {
  //   name:this.signUpForm.value.name,
  //   email:this.signUpForm.value.email,
  //   phone:this.signUpForm.value.phone_number,
  //   uid:res?.user?.uid,
  //   docIdAccount:data?.id
  // }

  // this._auth.setUserObj(userObj);
  // //save token in local storage
  // this._auth.setUserToken(res?.user?.uid);
  // //navigate
  // this.router.navigate(['/dashboard']);
  // //show success notification
  // this.notificationService.success('', 'Registration has been successfully completed');
  // //close loader
  // this.loadingSubmit = false;
