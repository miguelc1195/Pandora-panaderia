import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { AuthService } from '../../servicios/auth.service';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.css',
})
export class TarjetaProductoComponent {
  @Input() producto!: Producto;

  constructor(
    public authService: AuthService,
    private carritoService: CarritoService
  ) {}

  /* para agregar al carrito, ahce una reservafutura si el stock es 0 */
  agregarAlCarrito() {
    if (this.authService.isLoggedIn()) {
      const productoParaCarrito: Producto = {
        ...this.producto,
        esReservaFutura: this.producto.stock === 0,
      };
      this.carritoService.agregarProducto(productoParaCarrito);
      alert(`${this.producto.nombre} añadido al carrito`);
    }
  }
}
