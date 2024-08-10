import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { HttpService } from 'src/app/core/services/http.service';
import { MetaDataService } from 'src/app/core/services/meta-data/meta-data.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { updatedUserObj } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

   // initial variables
   profileForm!:FormGroup;
   loadingSubmit:boolean = false;
   loadingSendPassword:boolean = false;
   userObj:any = this._auth.getUserObj();

   constructor(private validationService: ValidationService,
     private router:Router,
     private _auth: AuthService,
     private _fireStore:FirestoreService,
     private _metaService:MetaDataService,
     private _fireAuth:AngularFireAuth,
     private notificationService: NotificationsService,
     private errHandle: ErrorHandlingService){
      _metaService.updatePageTitle('Profile Page');

   }

   ngOnInit(): void {


     this.profileForm=new FormGroup({
       name: new FormControl('', [Validators.required,Validators.pattern(this.validationService.alphaPattern)]),
       email: new FormControl('', [
         Validators.email,
         Validators.required,
         Validators.pattern(this.validationService?.emailPattern),
       ]),
       phone_number:new FormControl('',[Validators.required,  Validators.maxLength(15),
         Validators.pattern(this.validationService.phonePattern)]),
     }
     );

     this.fillUserDataToProfileForm();

   }

   fillUserDataToProfileForm(){
    this.profileForm.patchValue({
      name:this.userObj?.name,
      email:this.userObj?.email,
      phone_number:this.userObj.phone
    })
   }

   sendLinkToResetPassword(){
    this.loadingSendPassword = true;
    this._fireAuth.sendPasswordResetEmail(this.userObj?.email).then(data=>{
      this.loadingSendPassword = false;
      this.notificationService.success('','Please Check Your Email!')
    }).catch(err=>{
      this.loadingSendPassword = false;
      this.errHandle.errorHandling(err);
    })
   }

   save(){
     if(this.profileForm.valid && this.profileForm.dirty){
       this.loadingSubmit = true;

       let payload:any = {
        name:this.profileForm.value.name,
        phone:this.profileForm.value.phone_number
       }

       this.loadingSubmit = true;
       this._fireStore.updateAccount(payload).then(data=>{

         // ******* in case success response *****
         // set update data
         let userObj:any = this.userObj;
         userObj['name'] = payload?.name;
         userObj['phone'] = payload?.phone;
         //update user data in local storage
         this._auth.setUserObj(userObj);
         //change name in navbar
         updatedUserObj.next(userObj);
         //close loader
         this.loadingSubmit = false;
         //show success notification
        this.notificationService.success('', 'Update data has been successfully');

      }).catch(err=>{
         // ******* in case error response *****
        this.errHandle.errorHandling(err);
        this.loadingSubmit = false;
       })

     }else{
       this.profileForm.markAllAsTouched();
     }
   }

}
