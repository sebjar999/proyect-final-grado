import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigPersonPageRoutingModule } from './config-person-routing.module';

import { ConfigPersonPage } from './config-person.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigPersonPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConfigPersonPage]
})
export class ConfigPersonPageModule {}
