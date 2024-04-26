import { isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean = false;
  platformId = inject(PLATFORM_ID);
  constructor(private router: Router) { }

  setUserToken(token: any) {
    if(isPlatformServer(this.platformId)){return}
    localStorage.setItem('userManagerAppToken', token);
    this.isAuth = true;
    this.checkUserAuth();
  }

  setUserObj(userObj: any) {
    if(isPlatformServer(this.platformId)){return}
    localStorage.setItem('userManagerAppObj', JSON.stringify(userObj));
  }

  checkUserAuth() {
    if(isPlatformServer(this.platformId)){return}
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
    if(isPlatformServer(this.platformId)){return}
    return localStorage.getItem('userManagerAppToken') || sessionStorage.getItem('userManagerAppToken');
  }

  getUserObj() {
    if(isPlatformServer(this.platformId)){return}
    if (localStorage.getItem('userManagerAppObj')) {
      return JSON.parse(localStorage.getItem('userManagerAppObj') || '')
    }
    return {};
  }

  isUserAuth() {
    if(isPlatformServer(this.platformId)){return}
    return this.isAuth;
  }

}
