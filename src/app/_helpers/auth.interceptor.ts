import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { TokenStorageService } from '../_services/token_storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEven<any>> {
    let authReq = req;

    const TOKEN = this.token.getToken();

    if (TOKEN != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'bearer' + TOKEN),
      });
    }

    return next.handle(authReq);
  }
}

export const AUTH_INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
