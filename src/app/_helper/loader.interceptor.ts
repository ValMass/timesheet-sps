import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '@app/component/loader/loader.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private readonly loaderService: LoaderService,
    private readonly router: Router,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Se ci troviamo nella pagina distanze, il loader non viene gestito.
    if (this.router.url !== '/distances') {
      this.loaderService.show();
      return next.handle(request).pipe(finalize(() => this.loaderService.hide()));
    }
    return next.handle(request);
  }
}
