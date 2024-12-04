import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../servicios/reservas.service';
import { AuthService } from '../servicios/auth.service';
import { Reserva } from '../interfaces/reserva';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css',
})
export class ReservasComponent implements OnInit {
  reservasActivas: Reserva[] = [];
  historialReservas: Reserva[] = [];
  mostrarHistorial: boolean = false;

  constructor(
    private reservasService: ReservasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const email = this.authService.firebaseAuth.currentUser?.email;
    if (email) {
      this.cargarReservas(email);
    }
  }

  /* carga las reservas segun el email del usuario */
  cargarReservas(emailU: string) {
    this.reservasService.getReservasUsuario(emailU).subscribe((reservas) => {
      this.reservasActivas = reservas
        .filter((res) => res.estado === 'pendiente')
        .sort(
          (resA, resB) =>
            new Date(resB.fechaCreacion).getTime() -
            new Date(resA.fechaCreacion).getTime()
        );

      this.historialReservas = reservas
        .filter((res) => res.estado === 'completada')
        .sort(
          (resA, resB) =>
            new Date(resB.fechaCreacion).getTime() -
            new Date(resA.fechaCreacion).getTime()
        );
    });
  }

  /* para mostrar la fecha y hora de forma correcta y que no nos de error */
  formatearFecha(fecha: Date | string): string {
    if (!fecha) return '';
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleString();
  }
}
