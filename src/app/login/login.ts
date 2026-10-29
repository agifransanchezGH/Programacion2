
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface RespuestaLogin {
  ok: boolean;
  mensaje: string;
  usuario?: {
    id: number;
    usuario: string;
    nombre: string;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  usuario = '';
  password = '';
  mensaje = '';
  cargando = false;

  private apiUrl = 'http://localhost/agus/PHP';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  iniciarSesion(): void {
    this.mensaje = '';

    if (!this.usuario.trim() || !this.password) {
      this.mensaje = 'Completa el usuario y la contraseña.';
      return;
    }

    this.cargando = true;

    this.http.post<RespuestaLogin>(
      `${this.apiUrl}/Login.php`,
      {
        usuario: this.usuario.trim(),
        password: this.password
      },
      {
        withCredentials: true
      }
    ).subscribe({
      next: (respuesta) => {
        this.cargando = false;

        if (respuesta.ok) {
          // Cambia "inicio" por la ruta de tu página principal.
          this.router.navigate(['inicio']);
        } else {
          this.mensaje = respuesta.mensaje;
        }
      },
      error: (error) => {
        this.cargando = false;

        if (error.status === 401) {
          this.mensaje = 'Usuario o contraseña incorrectos.';
        } else if (error.status === 0) {
          this.mensaje =
            'No se pudo conectar con el servidor PHP.';
        } else {
          this.mensaje =
            error.error?.mensaje || 'Ocurrió un error al iniciar sesión.';
        }
      }
    });
  }
}
