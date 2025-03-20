import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { UserCommandDTO } from '../models/user/user.command.dto';
import { Observable } from 'rxjs';
import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = `${enviroment.apiUrl}/auth/register`;

  constructor(private httpClient: HttpClient) { }

  register(user: UserCommandDTO): Observable<User> {
    
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json',});

    return this.httpClient.post<User>(this.apiUrl, user/*, {headers}*/);
  }
}
