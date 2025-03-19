import { O } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { enviroment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {

  private isAuthenticaded = false;

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): boolean {
    
    this.httpClient.post(`${enviroment.apiUrl}/auth/login`, { email, password }, {responseType: 'text'}).subscribe((response) =>{
        localStorage.setItem('token', response);
        this.isAuthenticaded = true;
      }),
      catchError((error) => {
        this.isAuthenticaded = false;
        let errorMessage = 'Unknown error';
        if (error.status === 0) {
          errorMessage = 'Server connection error';
        } else if (error.status === 403) {
          errorMessage = 'Bad credentials';
        }
        return throwError(() => new Error(errorMessage));
      });
    return this.isAuthenticaded;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticaded = false;
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
