import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@features/auth/auth-container/auth-container').then((m) => m.AuthContainer),
  },
  { path: 'login', redirectTo: 'auth' },
  { path: 'register', redirectTo: 'auth' },
  {
    path: 'dashboard',
    loadComponent: () => import('@features/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
