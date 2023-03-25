import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutasAfiliadasPage } from './rutas-afiliadas.page';

const routes: Routes = [
  {
    path: '',
    component: RutasAfiliadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutasAfiliadasPageRoutingModule {}
