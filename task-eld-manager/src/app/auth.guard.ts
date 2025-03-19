import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router, Routes } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({
        providedIn: 'root',
    }
)

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    else {
        this.router.navigate(['/login']);
        return false;  
    }
  }
}