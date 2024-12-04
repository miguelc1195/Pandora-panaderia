export interface Reserva {
  _id?: string;
  usuario: string; //el email

  productos: {
    producto: string;
    cantidad: number;
    precio: number;
    extra?: string;
  }[];

  fechaCreacion: Date;
  estado: 'pendiente' | 'completada';
  precioTotal: number;
  fechaRecogida: Date;
  horaRecogida: string;
}
