import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefinirPageRoutingModule } from './definir-routing.module';

import { DefinirPage } from './definir.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefinirPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DefinirPage]
})
export class DefinirPageModule { }
