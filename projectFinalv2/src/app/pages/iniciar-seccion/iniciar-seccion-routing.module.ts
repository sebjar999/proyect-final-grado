import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciarSeccionPage } from './iniciar-seccion.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarSeccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarSeccionPageRoutingModule {}
