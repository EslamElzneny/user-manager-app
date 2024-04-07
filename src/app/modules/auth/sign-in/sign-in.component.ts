import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { FirestoreService, getDocIdObs$ } from 'src/app/core/services/firestore.service';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

   // initial variables
   signInForm!:FormGroup;
   loadingSubmit:boolean = false;
   hide = true; // for password icon

   constructor(private validationService: ValidationService,
    private _fireAuth:AngularFireAuth,
     private router:Router,
     private _fireStore:FirestoreService,
     private _auth: AuthService,
     private http: HttpClient,
     private title: Title,
     private metaService: Meta,
     private notificationService: NotificationsService,
     private errHandle: ErrorHandlingService){

   }

   ngOnInit(): void {


     this.signInForm=new FormGroup({
       email: new FormControl('', [
         Validators.email,
         Validators.required,
         Validators.pattern(this.validationService?.emailPattern),
       ]),

       password: new FormControl(
         '',
         Validators.compose([
           Validators.required,
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
     });

     this.testMetaData();

   }

   testMetaData(){
     return this.http.get('https://fakestoreapi.com/products').subscribe(res=>{

          // OG system
          this.metaService.updateTag({ property: 'og:title', content: 'test user app' });
          this.metaService.updateTag({ property: 'og:url', content: `https://user-manager-app.vercel.app/dashboard/users-management?test=true` });
          this.metaService.updateTag({ property: 'og:type', content: '' });
          this.metaService.updateTag({ property: 'og:description', content: 'bla bla bla' });
          this.metaService.updateTag({ property: 'og:keywords', content: 'app app' });
          this.metaService.updateTag({ property: 'og:image', content: 'https://dashboard.i-makeup.com/storage/attribute_option/01%20Beige%20De%20Jour.png' });
          this.metaService.updateTag({ property: 'og:locale', content: 'en' });
          this.metaService.updateTag({ property: 'og:locale:alternate', content: 'en' });
     });
   }

   save(){
     if(this.signInForm.valid && this.signInForm.dirty){
       this.loadingSubmit = true;

       this._fireAuth.signInWithEmailAndPassword(
        this.signInForm.value.email,
        this.signInForm.value.password
       ).then(res=>{

          // in case user not verified email
          if(!res?.user?.emailVerified){
              this.notificationService.warn('','Please Verify Your Email')
              this.router.navigate(['/auth/verify-email']);
              return
          }

          let userData$ = this._fireStore.getAccountByUid(res?.user?.uid).subscribe((data:any)=>{
            // ******* in case success response *****
            const userData:any = data[0]?.payload.doc.data();
            if(userData){
              userData['email'] = this.signInForm.value.email;
              userData['docIdAccount'] = data[0]?.payload.doc?.id;
            }
            // fire doc id
            getDocIdObs$.next(userData?.docIdAccount);
            //save user data in local storage
            this._auth.setUserObj(userData);
            //save token in local storage
            this._auth.setUserToken(userData?.uid);
            //navigate *** delay until store token in local storage
            setTimeout(()=>{this.router.navigate(['/dashboard']);},100);
            //show success notification
            this.notificationService.success('', 'Login has been successfully completed');
            //close loader
            this.loadingSubmit = false;
            // unsubscribe userData
            userData$.unsubscribe();
          })


       }).catch(error=>{
        this.loadingSubmit = false;
        this.errHandle.errorHandling(error)
       })

     }else{
       this.signInForm.markAllAsTouched();
     }
   }

}
