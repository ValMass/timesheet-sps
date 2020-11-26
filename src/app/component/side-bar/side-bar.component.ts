import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  isadmin: boolean = true ;
  isSuperAdmin: boolean = false ;
  destinationTimesheet;

  constructor(
    public logoutService: AuthenticationService,
    private router: Router,
    private authServ: AuthenticationService,
    ) {

  }

  ngOnInit() {
    //let currentU = JSON.parse(localStorage.getItem('currentUser'));
    let currentU = this.authServ.currentUserValue;
    console.log("currentU" ,currentU);
    this.destinationTimesheet = currentU.id;
    console.log(this.destinationTimesheet);
    // tslint:disable-next-line: triple-equals
    if ( currentU.isadmin === '0') {
      console.log('zero');
      this.isadmin = true;
      this.isSuperAdmin = true;
      return;
    }
    if ( currentU.isadmin === '1' ) {
      console.log('uno');
      this.isadmin = true;
      this.isSuperAdmin = false; // per essere chiari
      return;
    }
    if (currentU.isadmin === '2') {
      console.log('due');
      this.isadmin = false;
      this.isSuperAdmin = false; // per essere chiari
      return;
    }
    console.log('role error'); // forse va bene
    this.logoutService.logout();
    return;

  }

  logout() {
    this.logoutService.logout().subscribe(
      result => {
        localStorage.removeItem('currentUser');
        this.authServ.removeCurrentSubject();
        this.router.navigate(['/login-page']);

      },
      error => {}
    );
     // remove user from local storage to log user out
     /*localStorage.removeItem('currentUser');
     this.currentUserSubject.next(null);
     this.router.navigate(['/login-page']);*/
  }

}
