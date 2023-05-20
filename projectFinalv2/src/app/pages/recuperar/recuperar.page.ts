import { Component, OnInit } from '@angular/core';
import { AlertController,NavController} from '@ionic/angular';
import { RecuperarService } from './recuperar.service';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
    recuperarC: string;
  
  constructor(private alertCtrl: AlertController,
    private recuperarService: RecuperarService,
    public navCtrl: NavController) {
   
  }

  ngOnInit() {
  }

  recuperarContrasena(){
     const body={
      email: this.recuperarC
     }

     this.recuperarService.recuperar(body).subscribe(data => {
      if ((data === true)) {
        console.log(data);        
      } else {
        this.navCtrl.navigateRoot('confirmar-codigo');
        console.log(data);
      }
    });
  }
  onSubmit() {
    
 
  }

}
