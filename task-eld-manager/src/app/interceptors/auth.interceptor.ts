import { HttpHandler, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { Observable } from "rxjs";



export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const token = inject(AuthService).getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next(request);
  }
