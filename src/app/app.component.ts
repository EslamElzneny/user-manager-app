import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-manager-app';
  notifierOptions: any = {
    animate: "fromTop",
    position: ["top", "right"],
    clickToClose: true,
    maxStack:1
  }
}
