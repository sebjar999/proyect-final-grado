import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarRutaPage } from './editar-ruta.page';

const routes: Routes = [
  {
    path: '',
    component: EditarRutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarRutaPageRoutingModule {}
