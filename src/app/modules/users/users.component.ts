import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { Subject } from 'rxjs';
import { FirestoreService, User } from 'src/app/core/services/firestore.service';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { NotificationsService } from 'angular2-notifications';
export interface PeriodicElement {
  name: string;
  id: string;
  email: string;
  phone: string;
  created_at:Date
}
type Sort = 'asc' | 'desc';
export let isAddNewUser:Subject<boolean> = new Subject<boolean>();
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,OnDestroy {

  schemaList:any[] = ['','','','','','','']
  isLoading:boolean = false;
  loadingSubmit:boolean = false;
  sortsList: any[] = [
    { name: 'Newest Created First', key: 'asc' },
    { name: 'Oldest Created First', key: 'desc' },
  ];
  usersObs$:any;
  usersList:any[] = [];
  @ViewChild('confirmMessage') confirmMessage!: TemplateRef<any>;
  dialogRefConfirmMsg:any;
  dialogRefUser:any;
  selectedUser!:User;
  selectedSort:Sort = 'asc'
  searchKeyword:any;

  constructor(public dialog:MatDialog,
    private _fireStore:FirestoreService,
    private notificationService: NotificationsService,
    private errorHandling:ErrorHandlingService){
  }

  ngOnInit(): void {
    this.getAllUsers();
    // in case add or edit user call function to get all users
    isAddNewUser.subscribe(newUser=>{
      if(newUser){
        this.getAllUsers();
      }
    })
  }

  getAllUsers(){
    this.isLoading = true;
    this.usersObs$ = this._fireStore.getAllUsers().subscribe(res=>{
      // fetch all data and assign to variable
        this.usersList = res.map((d:any)=>{
          const data:any = d.payload.doc.data();
          data['id'] = d.payload.doc.id
          return data;
        })
        // close loading
        this.isLoading = false;
    },err=>{
        this.errorHandling.errorHandling(err);
        this.isLoading = false
    })
  }

  openUserPopup(user?:User){
    this.dialogRefUser = this.dialog.open(AddUserComponent,{data:user,maxWidth:'750px',width:'95%'})
  }

  deleteUser(user:User){
    this.selectedUser = user;
    this.dialogRefConfirmMsg = this.dialog.open(this.confirmMessage);
  }

 confirm(){
  this.loadingSubmit = true;
  this._fireStore.deleteUser(this.selectedUser).then(res=>{
    this.loadingSubmit = false;
    //show success notification
    this.notificationService.success('', 'Delete user has been successfully');
    // close dialog
    this.dialogRefConfirmMsg.close();
  }).catch(err=>{
    this.errorHandling.errorHandling(err);
    this.loadingSubmit = false;
  })
 }

 cancel(){
  this.dialogRefConfirmMsg.close();
 }

 onChangeSort(e:any){
  this.isLoading = true;
  setTimeout(()=>{this.isLoading = false},500)
  this.selectedSort = e;
 }

 ngOnDestroy(): void {
   this.usersObs$.unsubscribe();
 }

}
