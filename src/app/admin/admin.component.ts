import { Component, OnInit } from '@angular/core';
import { Reserva } from '../interfaces/reserva';
import { ReservasService } from '../servicios/reservas.service';
import { CommonModule, DatePipe, NumberSymbol } from '@angular/common';
import { ProductosService } from '../servicios/productos.service';
import { Producto } from '../interfaces/producto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  reservasActivas: Reserva[] = [];
  historialReservas: Reserva[] = [];
  mostrarHistorial: boolean = false;
  productos: Producto[] = [];
  mostrarStock: boolean = false;

  constructor(
    private reservasService: ReservasService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
    this.cargarProductos();
  }

  cargarReservas() {
    this.reservasService.getAllReservas().subscribe((reservas) => {
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

  cargarProductos() {
    this.productosService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  marcarComoCompletada(reservaId: string) {
    this.reservasService
      .cambiarEstadoReserva(reservaId, 'completada')
      .subscribe(() => {
        this.cargarReservas(); //para recargar la lista;
      });
  }

  formatearFecha(fecha: Date | string): string {
    if (!fecha) return '';
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleString();
  }

  esMismaFecha(fechaRecogida: Date): boolean {
    const hoy = new Date();
    const fechaR = new Date(fechaRecogida);

    return (
      hoy.getDate() === fechaR.getDate() &&
      hoy.getMonth() === fechaR.getMonth() &&
      hoy.getFullYear() === fechaR.getFullYear()
    );

    /*   if (!mismaFecha) {
      return false;
    }

    const [horaRecogidaH, horaRecogidaM] = horaRecogida.split(':').map(Number);
    const horaActual = hoy.getHours();
    const minutosActual = hoy.getMinutes();

   
    const minutosRecogida = horaRecogidaH * 60 + horaRecogidaM;  // convertir todo a minutos para comparar
    const minutosAhora = horaActual * 60 + minutosActual;

    return minutosAhora >= minutosRecogida; */
  }

  actualizarStock(producto: Producto) {
    this.productosService
      .updateStock(producto._id, producto.stock)
      .subscribe(() => {
        alert('Stock actualizado correctamente');
      });
  }

  reinicioStock() {
    if (confirm('¿Estás seguro de que quieres reiniciar todo el stock?')) {
      this.productosService.reiniciarStock().subscribe(() => {
        alert('Stock reiniciado correctamente');
        window.location.reload();
      });
    }
  }
}
