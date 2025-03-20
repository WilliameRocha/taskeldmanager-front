import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashComponent } from './dash/dash.component';
import { AuthGuard } from './auth.guard';
import { TaskComponent } from './task/task.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dash', component: DashComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MatDialogModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
