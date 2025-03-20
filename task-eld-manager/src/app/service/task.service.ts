import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TasksCommandDTO } from '../models/task/task.command.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { Task } from '../models/task/Task';
import { TaskQueryDTO } from '../models/task/task.query.dto';
import { TaskUpdateDTO } from '../models/task/task.update.dto';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = `${environment.apiUrl}/api/task`;

  constructor(private httpClient: HttpClient) { }

  createTask(task: TasksCommandDTO): Observable<Task> {
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',});

    return this.httpClient.post<Task>(this.apiUrl, task, {headers});
  }

  findTasksByUserId(userId: number): Observable<TaskQueryDTO[]> {
    return this.httpClient.get<TaskQueryDTO[]>(`${this.apiUrl}/byuser/${userId}`);
  }

  updateTasks(tasks: TaskUpdateDTO[]): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.apiUrl}/update`, tasks);
  }
}
