import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','nav.css', './birds.css']
})
export class AppComponent {
  title = 'ng-events';
  theme: string = 'blue';
  isMenuShowing = false;
  showHideMenu() {
    this.isMenuShowing = !this.isMenuShowing;
  }
}
