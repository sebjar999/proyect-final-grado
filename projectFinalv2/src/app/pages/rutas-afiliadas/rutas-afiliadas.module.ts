import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';

import { RutasAfiliadasPageRoutingModule } from './rutas-afiliadas-routing.module';

import { RutasAfiliadasPage } from './rutas-afiliadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutasAfiliadasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RutasAfiliadasPage]
})
export class RutasAfiliadasPageModule {}
