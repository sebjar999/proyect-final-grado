import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarCodigoPageRoutingModule } from './confirmar-codigo-routing.module';

import { ConfirmarCodigoPage } from './confirmar-codigo.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarCodigoPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ConfirmarCodigoPage]
})
export class ConfirmarCodigoPageModule {}
