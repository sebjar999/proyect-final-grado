import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor() { }

  ngOnInit() {

    setTimeout(() => {
      document.getElementById('background-font').hidden=true;    
      document.getElementById('pagina_de_inicio').hidden=true;
    }, 2000);
  }

}
