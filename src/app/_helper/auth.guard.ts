import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token ) {
        // logged in so return true
        return true;
    }
    if (this.isLogged()) {
      return true;

    } else {

      this.router.navigate(['/login-page'], { queryParams: { returnUrl: state.url } });
      return false;
    }

  }

  isLogged() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token ) {
        // logged in so return true
        return true;
    } else {
      return false;
    }
  }
}
