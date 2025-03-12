import { Routes } from '@angular/router';

import { PublicComponent } from './public/public.component';
import { LoginComponent } from './public/components/login/login.component';
import { RegisterComponent } from './public/components/register/register.component';
import { DashboardComponent } from './private/components/dashboard/dashboard.component';
import { NotFoundComponent } from './public/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'public',
    component: PublicComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'private',
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
