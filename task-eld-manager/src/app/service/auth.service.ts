import { O } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { UserQueryDTO } from '../models/user/user.query.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticaded = false;
  private sessionKey = 'userData';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): boolean {
    
    this.httpClient.post(`${environment.apiUrl}/auth/login`, { email, password }, {responseType: 'text'}).subscribe((response) =>{
        localStorage.setItem('token', response);
        this.isAuthenticaded = true;
      }),
      catchError((error) => {
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
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUser(user: UserQueryDTO): void {
    sessionStorage.setItem(this.sessionKey, JSON.stringify(user));
  }

  getUser(): UserQueryDTO | null{
    const user = sessionStorage.getItem(this.sessionKey);
    return user ? JSON.parse(user) : null;
  }
}
