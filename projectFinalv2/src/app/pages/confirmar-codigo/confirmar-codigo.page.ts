import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ConfirmarCodigoService } from './confirmar-codigo.service';
ConfirmarCodigoService
@Component({
  selector: 'app-confirmar-codigo',
  templateUrl: './confirmar-codigo.page.html',
  styleUrls: ['./confirmar-codigo.page.scss'],
})
export class ConfirmarCodigoPage implements OnInit {
  codigoc: string;
  contra: string;
  constructor(private alertCtrl: AlertController, 
    private confirmarCodigoService: ConfirmarCodigoService,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  codigo() {
    console.log(this.contra,this.codigoc );
    
    const body = {
      code: this.codigoc,
      password: this.contra,
      new_password:this.contra
    }
    this.confirmarCodigoService.codigo(body).subscribe(data => {
      if ((data === true)) {
        console.log(data);
        console.log("funciona");
      } else {
        this.navCtrl.navigateRoot('inicio');
        console.log(data);
      }
    });
  }
}


