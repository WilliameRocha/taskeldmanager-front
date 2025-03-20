import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { SignupService } from '../service/signup.service';
import { UserCommandDTO } from '../models/user/user.command.dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatError,
    MatLabel,
    MatFormField,
    MatCard,
    MatCardTitle,
    NgIf,
    MatCardContent
  ]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private signupService: SignupService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }, 
    
  );
  }

  onSubmit(): void {
    if (this.signupForm.valid) {

      const newUser: UserCommandDTO = {
        firstName: this.signupForm.value.firstName,
        lastName:this.signupForm.value.lastName,
        email:this.signupForm.value.email,
        password:this.signupForm.value.password
      };
      
      this.signupService.register(newUser).subscribe({
        next: (user) => {
          alert('User registered successfully!');
          this.signupForm.reset();
        },
        error: (error) => {
          alert('An error occurred while registering the user!');
        }
      });
    }
    else{
      alert('Please fill out the form correctly!');
    }
  }
}

export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  return value.trim().length === 0 ? { whitespace: true } : null;
}