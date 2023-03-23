import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCuentaPageRoutingModule } from './editar-cuenta-routing.module';

import { EditarCuentaPage } from './editar-cuenta.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCuentaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [EditarCuentaPage]
})
export class EditarCuentaPageModule {}
