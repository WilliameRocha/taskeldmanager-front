import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskQueryDTO } from '../models/task/task.query.dto';
import { TaskService } from '../service/task.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { TaskUpdateDTO } from '../models/task/task.update.dto';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss',
  imports: [
    CdkDropList, 
    CdkDrag, 
    MatDialogModule, 
    FormsModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatFormField,
    MatIcon,
    MatDatepickerToggle]
})
export class DashComponent {

  todo: TaskQueryDTO[] = [];
  
  doing: TaskQueryDTO[] = [];

  done: TaskQueryDTO[] = []; 

  constructor(private authService: AuthService, private taskService: TaskService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    const userId = this.authService.getUser()?.id;

    this.taskService.findTasksByUserId(userId ?? 0).subscribe({ 
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

    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
        result.status = 'TO_DO';
        result.userId = this.authService.getUser()?.id;

        this.taskService.createTask(result).subscribe({
          next: (task) => {

            const newTask: TaskQueryDTO = {
              id: task.id,
              title: task.title,
              status: task.status,
              deadline: task.deadline,
              userId: task.user.id,
              createdAt: task.createdAt
            };

            this.todo.push(newTask);
          },
          error: (error) => {
            alert('An error occurred while creating the task!');
          }
        });
      }
    })
  }

  updateTasks(): void{

    let tasks: TaskUpdateDTO[] = [];

    this.todo.forEach((task) => {
      const taskUpdate: TaskUpdateDTO = {
        id: task.id,
        status: 'TO_DO',
        userId: task.userId,
        title: task.title,
        deadline: task.deadline,
        createdAt: task.createdAt
      };
      tasks.push(taskUpdate);
    });

    this.doing.forEach((task) => {
      const taskUpdate: TaskUpdateDTO = {
        id: task.id,
        status: 'DOING',
        userId: task.userId,
        title: task.title,
        deadline: task.deadline,
        createdAt: task.createdAt
      };
      tasks.push(taskUpdate);
    });

    this.done.forEach((task) => {
      const taskUpdate: TaskUpdateDTO = {
        id: task.id,
        status: 'DONE',
        userId: task.userId,
        title: task.title,
        deadline: task.deadline,
        createdAt: task.createdAt
      };
      tasks.push(taskUpdate);
    });

    this.taskService.updateTasks(tasks).subscribe({
      next: () => {
        alert('Tasks updated successfully!');
      },
      error: (error) => {
        alert('An error occurred while updating the tasks!');
      }
    });
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
