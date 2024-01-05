import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';

export let updatedUserObj:Subject<any> = new Subject<any>();
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loadingSubmit:boolean = false;
  userObj:any = this._auth.getUserObj();
  constructor(private _fireAuth:AngularFireAuth,
    private _auth:AuthService,
    private errHandle: ErrorHandlingService){
  }

  ngOnInit(): void {
    updatedUserObj.subscribe(userObj=>{
      this.userObj = userObj;
    })
  }

  logout(){
    this.loadingSubmit = true;
    this._fireAuth.signOut().then(res=>{
      this.loadingSubmit = false;
      this._auth.signOut();
    }).catch(err=>{
      this.loadingSubmit = false;
      this.errHandle.errorHandling(err);
    })
  }


}
