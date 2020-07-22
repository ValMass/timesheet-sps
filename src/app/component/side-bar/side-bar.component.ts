import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  isadmin: boolean = false ;

  constructor(
    public logoutService: AuthenticationService
    ) {

  }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout();
  }

}
