import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TasksCommandDTO } from '../models/task/TaskCommandDTO';
import { Observable } from 'rxjs';
import { enviroment } from '../../environments/environment.dev';
import { Task } from '../models/task/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = `${enviroment.apiUrl}/api/task`;

  constructor(private httpClient: HttpClient) { }

  createTask(task: TasksCommandDTO): Observable<Task> {
    
    // const token = `Bearer ${localStorage.getItem('token')}`;
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',});

    return this.httpClient.post<Task>(this.apiUrl, task, {headers});
  }
}
