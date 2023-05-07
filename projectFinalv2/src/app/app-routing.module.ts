import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoIngresadoGuard } from './no-ingresado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule)/* ,
    canActivate: [NoIngresadoGuard] */
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then(m => m.RegistrarPageModule)/* ,
    canActivate: [NoIngresadoGuard] */
  },
  { 
    path: 'iniciar-seccion',
    loadChildren: () => import('./pages/iniciar-seccion/iniciar-seccion.module').then(m => m.IniciarSeccionPageModule)/* ,
    canActivate: [NoIngresadoGuard] */
  },
  {
    path: 'definir',
    loadChildren: () => import('./pages/definir/definir.module').then(m => m.DefinirPageModule)
  },
  {
    path: 'crear-ruta',
    loadChildren: () => import('./pages/crear-ruta/crear-ruta.module').then(m => m.CrearRutaPageModule)
  },
  {
    path: 'rutas-disponibles',
    loadChildren: () => import('./pages/rutas-disponibles/rutas-disponibles.module').then(m => m.RutasDisponiblesPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  {
    path: 'mis-rutas',
    loadChildren: () => import('./pages/mis-rutas/mis-rutas.module').then(m => m.MisRutasPageModule)
  },
  {
    path: 'config-person',
    loadChildren: () => import('./pages/config-person/config-person.module').then( m => m.ConfigPersonPageModule)
  },
  {
    path: 'editar-cuenta',
    loadChildren: () => import('./pages/editar-cuenta/editar-cuenta.module').then( m => m.EditarCuentaPageModule)
  },
  {
    path: 'editar-ruta',
    loadChildren: () => import('./pages/editar-ruta/editar-ruta.module').then( m => m.EditarRutaPageModule)
  },
  {
    path: 'rutas',
    loadChildren: () => import('./pages/rutas/rutas.module').then( m => m.RutasPageModule)
  },
  {
    path: 'rutas-afiliadas',
    loadChildren: () => import('./pages/rutas-afiliadas/rutas-afiliadas.module').then( m => m.RutasAfiliadasPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'informacion-route-supscription',
    loadChildren: () => import('./pages/informacion-route-supscription/informacion-route-supscription.module').then( m => m.InformacionRouteSupscriptionPageModule)
  },

 




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
