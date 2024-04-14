import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ResolverComponent } from './modules/resolver/resolver.component';

@NgModule({
  declarations: [
    AppComponent,
    ResolverComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId:'serverApp'}),
    SimpleNotificationsModule.forRoot({
      clickIconToClose: true
    }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
