import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarRutaPageRoutingModule } from './editar-ruta-routing.module';

import { EditarRutaPage } from './editar-ruta.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarRutaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [EditarRutaPage]
})
export class EditarRutaPageModule {}
