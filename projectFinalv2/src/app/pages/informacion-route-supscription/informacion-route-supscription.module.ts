import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionRouteSupscriptionPageRoutingModule } from './informacion-route-supscription-routing.module';

import { InformacionRouteSupscriptionPage } from './informacion-route-supscription.page';
import { ComponentsModule } from 'src/app/components/components.module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionRouteSupscriptionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InformacionRouteSupscriptionPage]
})
export class InformacionRouteSupscriptionPageModule {}
