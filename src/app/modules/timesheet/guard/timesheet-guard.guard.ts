import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
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

    return currentUser && currentUser.token && currentUser.isadmin === '1' ? true : this.goToNotFound();
  }

  goToNotFound() {
    this.router.navigate(['timesheet']);
    console.log('you are not admin');
    return false;
  }
}
