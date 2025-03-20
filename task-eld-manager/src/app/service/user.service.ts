import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserQueryDTO } from '../models/user/user.query.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/api/user`;

  constructor(private httpClient: HttpClient) { }

  getUserByEmail(email: string): Observable<UserQueryDTO> {
    return this.httpClient.get<UserQueryDTO>(`${this.apiUrl}/email/${email}`);
  }
}
