import { Routes } from '@angular/router';
// Update the import path if the file is in a different location or fix the file name casing if needed
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];