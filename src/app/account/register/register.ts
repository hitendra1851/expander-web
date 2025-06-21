import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/AuthService';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  accountForm: FormGroup;
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      alias: ['', Validators.required],
      accountType: ['', Validators.required],
      phone: [''],
      address: [''],
      city: [''],
      state: [''],
      country: [''],
      postalCode: ['']
    });

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  async submit() {
    if (this.accountForm.invalid || this.userForm.invalid) return;

    const password = this.userForm.get('password')?.value;
    const confirmPassword = this.userForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const combined = {
      ...this.accountForm.value,
      ...this.userForm.value
    };

    const success = await this.auth.register(combined);
    if (success) {
      alert('Registration successful. Check your email for verification.');
      this.router.navigate(['/login']);
    }
  }
}
