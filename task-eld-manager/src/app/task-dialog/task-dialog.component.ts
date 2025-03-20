import { Component, Inject } from '@angular/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TasksCommandDTO } from '../models/task/task.command.dto';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-task-dialog',
  imports: [
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatDatepicker,
    MatDatepickerToggle,
    FormsModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatFormField,
    MatIcon,
    MatDatepickerToggle
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss',

})
export class TaskDialogComponent {

  task: TasksCommandDTO = {
    title: '',
    userId: 0,
    status: 'TO_DO',
    deadline: new Date(),
  };

  constructor(public dialogRef: MatDialogRef<TaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.dialogRef.close(this.task);
  }
}
