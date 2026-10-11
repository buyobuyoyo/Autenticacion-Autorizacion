import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  imports: [],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css',
})
export class IniciarSesionComponent {
  mensajeError = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion(event: Event, correo: string, contrasena: string) {
    event.preventDefault();

    this.authService.login({ correo, contrasena }).subscribe({
      next: (respuesta) => {
        this.authService.guardarSesion(respuesta.token, respuesta.rol);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.mensajeError.set('Correo o contraseña incorrectos');
      }
    });
  }
}