import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarCodigoPage } from './confirmar-codigo.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarCodigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarCodigoPageRoutingModule {}
