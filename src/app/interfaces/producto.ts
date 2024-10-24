export interface Producto {
    _id: string; 
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    urlImagen: string;
    disponible: boolean;
    tiempoPreparacion: number;
    stock: number;
}