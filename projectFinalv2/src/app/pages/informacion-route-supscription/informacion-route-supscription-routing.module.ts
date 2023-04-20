import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionRouteSupscriptionPage } from './informacion-route-supscription.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionRouteSupscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionRouteSupscriptionPageRoutingModule {}
