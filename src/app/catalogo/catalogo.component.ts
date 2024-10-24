import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../servicios/productos.service';
import { TarjetaProductoComponent } from './tarjeta-producto/tarjeta-producto.component';
import { Producto } from '../interfaces/producto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, TarjetaProductoComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: string[] = [];
  terminoBusqueda: string = '';
  categoriaSeleccionada: string = '';

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe(productos => {
      this.productos = productos;
      this.productosFiltrados = productos;
      let todasLasCategorias: string[] = [];
      

      for(let producto of productos) {
        if(!todasLasCategorias.includes(producto.categoria)) {
          todasLasCategorias.push(producto.categoria);
        }
      }
      this.categorias = todasLasCategorias;
    });
  }

  filtrarProductos() {

    let productosFiltrados = this.productos;
    if (this.terminoBusqueda !== '') {
      productosFiltrados = productosFiltrados.filter(producto => {
        const nombre = producto.nombre.toLowerCase();
        const descripcion = producto.descripcion.toLowerCase();
        const busqueda = this.terminoBusqueda.toLowerCase();
        
        return nombre.includes(busqueda) || descripcion.includes(busqueda);
      });
    }

    if (this.categoriaSeleccionada !== '') {
      productosFiltrados = productosFiltrados.filter(producto => {
        return producto.categoria === this.categoriaSeleccionada;
      });
    }

    this.productosFiltrados = productosFiltrados;
  }

  agregarAlCarrito(producto: Producto) {
    alert(`${producto.nombre} añadido al carrito`);
}
}
