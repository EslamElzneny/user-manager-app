import { Component, OnInit } from '@angular/core';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { Observable, filter, mapTo, merge } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'user-manager-app';
  notifierOptions: any = {
    animate: "fromTop",
    position: ["top", "right"],
    clickToClose: true,
    maxStack:1
  }

  isLoading$!:Observable<boolean>;
  private _showLoaderEvent$!:Observable<boolean>;
  private _hideLoaderEvent$!:Observable<boolean>;

  constructor(private router:Router){

  }

  ngOnInit(): void {
    this._showLoaderEvent$ = this.router.events.pipe(
      filter(e=> e instanceof ResolveStart),
      mapTo(true)
    );

    this._hideLoaderEvent$ = this.router.events.pipe(
      filter(e=> e instanceof ResolveEnd),
      mapTo(false)
    );

    this.isLoading$ = merge(this._hideLoaderEvent$,this._showLoaderEvent$);

  }

}
