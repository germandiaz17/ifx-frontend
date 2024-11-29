import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate:[authGuard]},
    {path: 'empleados/:id', component: EmpleadosComponent, canActivate:[authGuard]},
    {path: '**', redirectTo: ''}
];
