import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    private _http:HttpService,
    private _activatedRoute:ActivatedRoute,
    private notify: NotificationsService,
  ){

  }
  userId:number|null = null;
  userInfo!:User;
  userDetailsObservable!:Subscription;
  isLoading:boolean = false;

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params=>{
      if(params['id']){
        this.userId = params['id'];
        this.getUserDetails();
      }
    })
  }

  getUserDetails(){
    this.isLoading = true;
    this.userDetailsObservable = this._http.getReq(`/users/${this.userId}`).subscribe((res:any)=>{
      this.userInfo = (res?.data) as User;
      this.userInfo['name'] = this.userInfo.first_name + ' ' + this.userInfo.last_name;
      this.isLoading = false;
    },err=>{
      this.notify.error('', 'Invalid Url or No data Found!');
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    if(!this.userDetailsObservable){return}
    this.userDetailsObservable.unsubscribe();
  }

}
