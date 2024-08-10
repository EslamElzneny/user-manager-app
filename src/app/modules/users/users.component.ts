import { Component, HostListener, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UsersRep } from 'src/app/shared/interfaces/usersResp.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
export interface PeriodicElement {
  name: string;
  id: string;
  email: string;
  phone: string;
  created_at:Date
}
type Sort = 'a-z' | 'z-a';
export let isAddNewUser:Subject<boolean> = new Subject<boolean>();
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,OnDestroy {

  schemaList:any[] = ['','','','','','','','']
  isLoading:boolean = false;
  loadingSubmit:boolean = false;
  sortsList: any[] = [
    {name: 'From: A-Z', key: 'a-z'},
    {name: 'From: Z-A', key: 'z-a'},
  ];
  usersObs$:any;
  usersList:User[] = [];
  // pagination info
  currentPage:number = 1;
  perPage:number = 0;
  totalItems:number = 0;
  queryParams:any = {};
  // end pagination info
  selectedSort:Sort = 'a-z'
  searchKeyword:any;

  constructor(public dialog:MatDialog,
    private _http:HttpService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    private errorHandling:ErrorHandlingService){
  }

  platform_id:Object = inject(PLATFORM_ID);
  isMobile:boolean = true;
  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe(params=>{
      if(params['page'] || params['pageSize']){
        // prepare payload data
        this.queryParams['page'] = +params['page'] || 1;
        this.queryParams['per_page'] = +params['pageSize'] || 10; // note: here change value of obj not reference
        this.getAllUsers();
      }
    })

    this.getAllUsers();
    // in case add or edit user call function to get all users
    isAddNewUser.subscribe(newUser=>{
      if(newUser){
        this.getAllUsers();
      }
    })

    if(isPlatformBrowser(this.platform_id)){
     this.isMobileView();
    }

  }

  @HostListener('window:resize')
  onResize(): void {
    this.isMobileView();
  }

  isMobileView(){
    if(document.body.clientWidth < 676){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
  }

  getAllUsers(){
    // open skeleton
    this.isLoading = true;
    this.usersObs$ = this._http.getReq('/users',{params:this.queryParams}).subscribe((res:UsersRep)=>{
      // fetch all data and assign to variable
      this.usersList = res.data.map((user:User) => ({
        ...user,
        name: `${user.first_name} ${user.last_name}`
      }));
      // assign pagination info to variables
      this.currentPage = +res.page - 1; // pageIndex start from 0
      this.perPage = +res.per_page;
      this.totalItems = +res.total;
      // close loading
      this.isLoading = false;
      this.searchKeyword = '';
    },err=>{
      this.errorHandling.errorHandling(err);
      this.isLoading = false
    })
  }

 onChangeSort(e:any){
  this.isLoading = true;
  setTimeout(()=>{this.isLoading = false},500)
  this.selectedSort = e;
 }

 paginate(e:any){
    this._router.navigate([],{queryParams:{
      page:e?.pageIndex + 1,
      pageSize:e?.pageSize,
    }})
 }

 ngOnDestroy(): void {
   this.usersObs$.unsubscribe();
 }

}
