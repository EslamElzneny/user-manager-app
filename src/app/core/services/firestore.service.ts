import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

export interface Account{
  id:string,
  uid:string|undefined,
  name:string,
  phone:string,
}
export interface User{
  id?:string,
  name:string,
  email:string,
  phone:string,
  password?:string,
  created_at:Date,
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private _fireStore:AngularFirestore,
    private _auth:AuthService) {  }

  docIdAccount:string|null = this._auth.getUserObj()?.docIdAccount;

  generateUniqueId(){
    return this._fireStore.createId();
  }

  addAccount(account:Account){
    account.id = this.generateUniqueId();
    return this._fireStore.collection('/accounts').add(account);
  }

  getAccountByUid(uid:string|undefined){
    return this._fireStore.collection('/accounts', ref => ref.where('uid','==',uid)).snapshotChanges();
  }

  addUser(user:User){
    user.id = this.generateUniqueId();
    return this._fireStore.collection(`/accounts/${this.docIdAccount}/users`).add(user);
  }

  getAllUsers(){
    return this._fireStore.collection(`/accounts/${this.docIdAccount}/users`).snapshotChanges();
  }

  deleteUser(user:User){
    return this._fireStore.doc(`/accounts/${this.docIdAccount}/users/${user.id}`).delete();
  }

  updateUser(user:User){
    let userId = user.id;
    delete user['id']; // send without id
    return this._fireStore.doc(`/accounts/${this.docIdAccount}/users/${userId}`).update(user);
  }

  updateAccount(account:{name?:string,phone?:string}){
    return this._fireStore.doc(`/accounts/${this.docIdAccount}`).update(account);
  }

  searchByName(value:string){
    return this._fireStore.collection(`/accounts/${this.docIdAccount}/users`,ref =>
    ref.orderBy('name').startAt(value).endAt(value + '\uf8ff')).snapshotChanges();
  }

}
