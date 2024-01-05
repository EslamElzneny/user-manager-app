import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { FirestoreService, User } from 'src/app/core/services/firestore.service';
import { isAddNewUser } from '../users.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

   // initial variables
   userForm!:FormGroup;
   loadingSubmit:boolean = false;
   hide = true; // for current password icon
   isUpdate:boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef:MatDialogRef<AddUserComponent>,
  private validationService: ValidationService,
  private errorHandling:ErrorHandlingService,
  private notificationService: NotificationsService,
  private _fireStore:FirestoreService){

  }

  ngOnInit(): void {

    this.userForm=new FormGroup({
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
         //  Validators.required,
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
    },
    );

    this.fillDataForm();

  }

  fillDataForm(){
    if(this.data?.id){
      this.isUpdate = true;
      this.userForm.patchValue({
        email:this.data?.email,
        name:this.data?.name,
        phone_number:this.data?.phone,
      })
    }
  }

save(){
  if(this.loadingSubmit){return}
  if(this.userForm.invalid || !this.userForm.dirty){
    this.userForm.markAllAsTouched();
    return
  }

  this.loadingSubmit = true;
  let payload:User = {
    name:this.userForm.value.name,
    phone:this.userForm.value.phone_number,
    email:this.userForm.value.email,
    created_at: new Date()
  }
  if(this.userForm.value.password){
    payload['password'] = this.userForm.value.password;
  }

  //in case add user
  if(!this.isUpdate){
    payload['id'] = '';
    this.addUser(payload);
  }else{
    payload['id'] = this.data?.id;
    this.updateUser(payload);
  }

}

addUser(payload:User){
  this._fireStore.addUser(payload).then(data=>{
    // close loading
    this.loadingSubmit = false;
    // close dialog
    this.dialogRef.close();
    //show success notification
    this.notificationService.success('', 'Add user has been successfully');
    // fire stream to get list updated users
    isAddNewUser.next(true);
  }).catch(err=>{
    this.errorHandling.errorHandling(err);
    this.loadingSubmit = false;
  })
}

updateUser(payload:User){
  this._fireStore.updateUser(payload).then(data=>{
    // close loading
    this.loadingSubmit = false;
    // close dialog
    this.dialogRef.close();
    //show success notification
    this.notificationService.success('', 'Update user has been successfully');
    // fire stream to get list updated users
    isAddNewUser.next(true);
  }).catch(err=>{
    this.errorHandling.errorHandling(err);
    this.loadingSubmit = false;
  })
}

cancel(){
  if(this.loadingSubmit){return}
  this.dialogRef.close();
}

}
