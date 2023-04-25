import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CajaComentariosComponent } from './caja-comentarios/caja-comentarios.component';



import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CajaComentariosComponent    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CajaComentariosComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
