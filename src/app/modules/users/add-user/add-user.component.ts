import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

   // initial variables
   profileForm!:FormGroup;
   loadingSubmit:boolean = false;
   hide = true; // for current password icon

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private validationService: ValidationService,){

  }

  ngOnInit(): void {

    this.profileForm=new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern(this.validationService.alphaPattern)]),
      current_password: new FormControl('', []),
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
      password_confirmation: new FormControl('', [
       // Validators.required
     ]),
    },
    { validators: this.validationService.matchingPasswords() }
    );

  }


save(){

}

}
