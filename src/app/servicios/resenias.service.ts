import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resenia } from '../interfaces/resenia';

@Injectable({
  providedIn: 'root',
})
export class ReseniasService {
  private apiUrl = 'http://localhost:3000/api/resenias';

  constructor(private http: HttpClient) {}

  getReseniasPorProducto(productoId: string): Observable<Resenia[]> {
    return this.http.get<Resenia[]>(`${this.apiUrl}/producto/${productoId}`);
  }

  crearResenia(resenia: Resenia): Observable<Resenia> {
    return this.http.post<Resenia>(this.apiUrl, resenia);
  }
}
