import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.css'
})
export class TarjetaProductoComponent {
  @Input() producto!: Producto;
  @Output() agregar = new EventEmitter<Producto>();

  onAgregarClick() {
    this.agregar.emit(this.producto);
  }
}