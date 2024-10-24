import { Routes } from '@angular/router';

export const routes: Routes = [
  // ruta por defecto
  { 
    path: '', 
    redirectTo: '/catalogo', 
    pathMatch: 'full' 
  },
   
  {
    path: 'catalogo',
    loadComponent: () => import('./catalogo/catalogo.component')
      .then(m => m.CatalogoComponent)
  },
  {
    path: 'catalogo/:id',
    loadComponent: () => import('./catalogo/detalle-producto/detalle-producto.component')
      .then(m => m.DetalleProductoComponent)
  },

  {
    path: 'reservas',
    loadComponent: () => import('./reservas/reservas.component')
      .then(m => m.ReservasComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent)
  },

  // en caso de que no se encuentre la ruta redirige a catalogo
  { 
    path: '**', 
    redirectTo: '/catalogo'
  }
];