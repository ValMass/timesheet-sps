import { Component } from '@angular/core';
import { AuthGuard } from '@app/_helper/auth.guard';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spsTimesheetAngular';
  logged;
  constructor( private auth: AuthGuard) {

  }

  userIsLogged(){
    if ( this.auth.isLogged() ) {
      return true;
    } else {
      return false;
    }
  }
}


