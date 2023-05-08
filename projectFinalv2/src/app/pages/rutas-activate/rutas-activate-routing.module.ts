import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutasActivatePage } from './rutas-activate.page';

const routes: Routes = [
  {
    path: '',
    component: RutasActivatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutasActivatePageRoutingModule {}
