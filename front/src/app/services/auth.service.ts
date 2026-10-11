import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credenciales } from '../modelos/credenciales';
import { RespuestaLogin } from '../modelos/respuesta-login';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    login(usuario: Credenciales): Observable<RespuestaLogin> {
        return this.http.post<RespuestaLogin>(`${this.url}/login`, usuario);
    }

    guardarSesion(token: string, rol: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('rol', rol);
    }

    obtenerToken() {
        return localStorage.getItem('token');
    }

    obtenerRol() {
        return localStorage.getItem('rol');
    }

    estaAutenticado() {
        return this.obtenerToken() !== null;
    }

    tieneRol(rolesPermitidos: string[]): boolean {
        const rol = this.obtenerRol();
        return rol !== null && rolesPermitidos.includes(rol);
    }

    cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
    }
}