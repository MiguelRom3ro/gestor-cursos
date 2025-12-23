import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

function minimumAgeValidator(minAge: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const birthDate = new Date(control.value);
    const today = new Date();

    const cutoffDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

    if (birthDate > cutoffDate) {
      return { tooYoung: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-container.html',
  styleUrl: './auth-container.scss',
})
export class AuthContainer {
  private fb = inject(FormBuilder);

  isRightPanelActive = false;

  loginPasswordVisible = false;
  registerPasswordVisible = false;
  confirmPasswordVisible = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&]).+/),
      ],
    ],
  });

  registerForm: FormGroup = this.fb.group({
    'register-name': [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
      ],
    ],
    'register-last-name': [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
      ],
    ],
    birthdate: ['', [Validators.required, minimumAgeValidator(10)]],
    'register-email': ['', [Validators.required, Validators.email]],
    'register-password': [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&]).+/),
      ],
    ],
    'confirm-password': [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&]).+/),
      ],
    ],
  });

  togglePanel(state: boolean) {
    this.isRightPanelActive = state;
  }

  toggleLoginPassword() {
    this.loginPasswordVisible = !this.loginPasswordVisible;
  }

  toggleRegisterPassword() {
    this.registerPasswordVisible = !this.registerPasswordVisible;
  }

  toggleConfirmPassword() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Registro:', this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
