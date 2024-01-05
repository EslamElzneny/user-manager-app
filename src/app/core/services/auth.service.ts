import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean = false;
  constructor(private router: Router) { }

  setUserToken(token: any) {
    localStorage.setItem('userManagerAppToken', token);
    this.isAuth = true;
    this.checkUserAuth();
  }

  setUserObj(userObj: any) {
    localStorage.setItem('userManagerAppObj', JSON.stringify(userObj));
  }

  checkUserAuth() {
    if (this.getUserToken()) {
      this.isAuth = true;
    }
  }

  signOut() {
    if(localStorage?.getItem('userManagerAppToken')){
      localStorage.removeItem('userManagerAppToken');
    }else{
      sessionStorage.removeItem('userManagerAppToken');
    }
    localStorage.removeItem('userManagerAppObj');

    this.isAuth = false;
    this.router.navigate(['/auth/sign-in'])
  }

  getUserToken() {
    return localStorage.getItem('userManagerAppToken') || sessionStorage.getItem('userManagerAppToken');
  }

  getUserObj() {
    if (localStorage.getItem('userManagerAppObj')) {
      return JSON.parse(localStorage.getItem('userManagerAppObj') || '')
    }
    return {};
  }

  isUserAuth() {
    return this.isAuth;
  }

}
