import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

export interface ProductoCarrito extends Producto {
  cantidad: number;
  extra?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  productosCarrito: ProductoCarrito[] = [];

  agregarProducto(producto: Producto) {
    const productoExistente = this.productosCarrito.find(
      (p) => p._id === producto._id
    );

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      this.productosCarrito.push({
        ...producto, //el operador (...) sirve para copiar todas las propiedades del objeto sin tener que copiar una por una
        cantidad: 1,
      });
    }
  }

  reservaFutura(producto: Producto) {
    const productoExistente = this.productosCarrito.find(
      (p) => p._id === producto._id
    );

    if (productoExistente) {
      if (productoExistente.cantidad + producto.cantidad! <= 5) {
        productoExistente.cantidad += producto.cantidad!;
      } else {
        alert('No puedes reservar más de 5 unidades de este producto');
      }
    } else {
      this.productosCarrito.push({
        ...producto,
        cantidad: producto.cantidad || 1,
      });
    }
  }

  eliminarProducto(id: string) {
    this.productosCarrito = this.productosCarrito.filter((p) => p._id !== id);
  }

  incrementarCantidad(producto: ProductoCarrito) {
    // para productos con stock normal
    if (!producto.esReservaFutura && producto.cantidad >= producto.stock) {
      alert('No hay suficiente stock disponible');
      return;
    }
    // para reservas futuras o productos con stock disponible
    producto.cantidad++;
  }

  reducirCantidad(producto: ProductoCarrito) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  getPrecioTotal(): number {
    return this.productosCarrito.reduce(
      (total, p) => total + p.precio * p.cantidad,
      0
    );
  }

  limpiarCarrito() {
    this.productosCarrito = [];
  }
}
