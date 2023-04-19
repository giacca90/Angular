import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent {
  destinos:string[];
  constructor() {
    this.destinos=['Barcelona','Madrid','Malaga','Tarragona']
  }
}
