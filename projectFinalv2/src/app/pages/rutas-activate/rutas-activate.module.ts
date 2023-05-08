import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutasActivatePageRoutingModule } from './rutas-activate-routing.module';

import { RutasActivatePage } from './rutas-activate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutasActivatePageRoutingModule
  ],
  declarations: [RutasActivatePage]
})
export class RutasActivatePageModule {}
