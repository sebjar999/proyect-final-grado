import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigPersonPage } from './config-person.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigPersonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigPersonPageRoutingModule {}
