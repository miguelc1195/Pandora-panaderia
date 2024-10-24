import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {
  producto: Producto | undefined;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productosService.getProductoPorId(id).subscribe({
          next: (producto) => {
            this.producto = producto;
          },
          error: (error) => {
            console.error('Error al cargar el producto:', error);
          }
        });
      }
    });
  }

  agregarAlCarrito() {
    if (this.producto) {
      alert(`${this.producto.nombre} añadido al carrito`);
    }
  }
}