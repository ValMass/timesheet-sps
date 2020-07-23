import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  isadmin: boolean = true ;

  constructor(
    public logoutService: AuthenticationService
    ) {

  }

  ngOnInit() {
    let currentU = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentU);
    // tslint:disable-next-line: triple-equals
    if ( currentU.isadmin == '1') {
      console.log('uno');
      this.isadmin = false;
    } else {
      console.log('due');
      this.isadmin = true;
    }
  }

  logout() {
    this.logoutService.logout();
  }

}
