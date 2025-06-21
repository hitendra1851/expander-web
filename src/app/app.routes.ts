// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login'; // ensure path is correct

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./account/account.routes').then(m => m.routes)
  },
  { path: '', redirectTo: 'account/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'account/login' }
];
