import { Routes } from '@angular/router';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { HomeComponent } from './componentes/home/home.component';
import { SinAccesoComponent } from './componentes/sin-acceso/sin-acceso.component';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: IniciarSesionComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin', 'Cliente'] }
  },
  { path: 'sin-acceso', component: SinAccesoComponent }
];