import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskQueryDTO } from '../models/task/task.query.dto';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss',
  imports: [CdkDropList, CdkDrag]
})
export class DashComponent {

  todo: TaskQueryDTO[] = [];
  
  doing: TaskQueryDTO[] = [];

  done: TaskQueryDTO[] = []; 

  constructor(private authService: AuthService, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.taskService.findTasksByUserId(1).subscribe({ 
      next: (tasks) => {
        this.todo = tasks.filter(task => task.status === 'TO_DO');
        this.doing = tasks.filter(task => task.status === 'DOING');
        this.done = tasks.filter(task => task.status === 'DONE');
      },
      error: (error) => {
        alert('An error occurred while fetching the tasks!');
      }
    });

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  addTask(): void {
    this.router.navigate(['/add-task']);
  }

  drop(event: CdkDragDrop<TaskQueryDTO[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
