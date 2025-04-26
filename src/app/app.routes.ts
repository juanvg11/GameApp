import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';

export const routes: Routes = [

  {
path: 'auth',
loadChildren: () => import('./auth/auth.routes'),
canMatch: [
  NotAuthenticatedGuard,
  /* () => {
    console.log('Hola Mundo');
    return true;
  } */
]
  },

  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
  },


  {
    path:'',
    loadChildren:()=> import('./app-front/app-front.routes')
  }
];
