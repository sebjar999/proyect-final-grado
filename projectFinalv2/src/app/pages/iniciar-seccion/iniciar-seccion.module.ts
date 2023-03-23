//Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IniciarSeccionPageRoutingModule } from './iniciar-seccion-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

//Pages
import { IniciarSeccionPage } from './iniciar-seccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciarSeccionPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [IniciarSeccionPage]
})
export class IniciarSeccionPageModule { }
