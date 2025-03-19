import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../models/task/Task';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    this.createTask();
  }

  createTask(): void {
    const task = this.taskService.createTask({ userId: 1, title: 'Task 1', status: 'TO_DO', deadline: new Date() }).subscribe({
      next: (response) =>  {
        console.log('Task created successfully:', response);
      },
      error: (e) => {
        console.error('Error creating task:', e);
      }
    });
    console.log(task);
  }
}
