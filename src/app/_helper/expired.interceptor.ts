import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '@app/services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private authServ: AuthenticationService,) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        // handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            // navigate /delete cookies or whatever
            this.router.navigateByUrl(`/login-page`);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            this.authServ.removeCurrentSubject();
            localStorage.removeItem("currentUser");
            return of(err.message); // or EMPTY may be appropriate here
        }
        return throwError(err);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
        //const authReq = req.clone({headers: req.headers.set(Cookie.tokenKey, Cookie.getToken())});
        // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
        return next.handle(req).pipe(catchError(x => this.handleAuthError(x)));
    }
}
