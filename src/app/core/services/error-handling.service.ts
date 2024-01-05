import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private notify: NotificationsService,
    private route:Router,
    private _auth :AuthService) { }


    errorHandling(err: any) {
      let code = err?.code;
      if(code == "auth/invalid-credential"){
        this.notify.error('Firebase Error', 'The supplied auth credential is incorrect, malformed or has expired.');
      }else if(code == "auth/email-already-in-use"){
        this.notify.error('Firebase Error', 'The email address is already in use by another account');
      }else if(code == 'auth/weak-password'){
        this.notify.error('Firebase Error', 'Password should be at least 6');
      }else if (err?.error?.code == 400) {
        this.notify.error("", err?.error?.errors[0]?.message);
      }else if (err?.error?.message) {
        this.notify.error('', err?.error?.message);
      } else if (err?.error?.code == 500 || err?.error?.code == 404) {
        this.notify.error('', 'Something wrong happened, please try again.');
      } else {
        let message = err?.message?.split(":")[1];
        this.notify.error('', message);
      }

    }


}
