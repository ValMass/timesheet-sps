import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetGuardGuard implements CanActivate {

  constructor(
    // questa e' una brutta cosa rende questo modulo dipendente
    // dall' esistenza di questa classe ma attualemnte non mi viene in mente come aggirare il problema
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    ){}

  /**
   * la logica di questa guardi è che se qualcuno prova ad inserire a mano l'indirizzo per editare timesheet senza essere amministratore
   * non viene reindirizzato
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    //console.log(currentUser);
    if ( currentUser && currentUser.token ){

      const { id } = next.params;
      if (id) {
        if (currentUser.role === '1' || currentUser.role === '0' ) {

          return true;
        } else {
          this.goToNotFound();
          return false;
        }
      } else {
        if (currentUser.role === '2' ) {

          return true;
        } else {
          this.goToNotFound();
          return false;
        }
      }

    } else {
      this.authenticationService.logout();
      return false;
    }

  }

  goToNotFound() {
    this.router.navigate(['pagenotfound']);
    //console.log('wrong acces to timesheet');
    return false;
  }
}
