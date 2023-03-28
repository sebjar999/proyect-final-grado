import { Component, OnInit } from '@angular/core';
import { CheckboxCustomEvent, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.scss'],
})
export class Modal2Component implements OnInit {
  canDismiss = false;

  presentingElement = null;
  
  constructor(private modalController: ModalController) { }

  ngOnInit() { 
  this.presentingElement = document.querySelector('.ion-page');
  console.log("entra");  
}

  onTermsChanged(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.canDismiss = ev.detail.checked;
    
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
  
}
