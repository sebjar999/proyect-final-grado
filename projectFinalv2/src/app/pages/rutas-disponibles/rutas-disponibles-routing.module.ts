import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutasDisponiblesPage } from './rutas-disponibles.page';

const routes: Routes = [
  {
    path: '',
    component: RutasDisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutasDisponiblesPageRoutingModule {}
