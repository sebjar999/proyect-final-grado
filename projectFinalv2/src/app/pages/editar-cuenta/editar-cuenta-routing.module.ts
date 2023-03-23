import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarCuentaPage } from './editar-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: EditarCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarCuentaPageRoutingModule {}
