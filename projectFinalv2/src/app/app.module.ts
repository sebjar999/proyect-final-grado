import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

/* import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
 */
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ComponentsModule,
  ],
  providers: [
    /* StatusBar,
    SplashScreen, */
    //AÑADIMOS GEOLOCATION Y GEOCODER
    //Geolocation,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule { }
