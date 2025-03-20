import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCommandDTO } from '../models/user/user.command.dto';
import { Observable } from 'rxjs';
import { User } from '../models/user/user';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = `${environment.apiUrl}/auth/register`;

  constructor(private httpClient: HttpClient) { }

  register(user: UserCommandDTO): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user);
  }
}
