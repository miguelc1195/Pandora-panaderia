import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}?categoria=${categoria}`);
  }

  updateStock(productoId: string, nuevoStock: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${productoId}/stock`, {
      stock: nuevoStock,
    });
  }

  reiniciarStock(): Observable<any> {
    return this.http.post(`${this.apiUrl}/reiniciar-stock`, {});
  }
}
