import { Component, EventEmitter, Input } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent {
  destinos:DestinoViaje[];
  constructor() {
    this.destinos=[]
  }
  
  guardar(nombre:string, url:string):boolean  {
    this.destinos.push(new DestinoViaje(nombre, url))
//    console.log(this.destinos)
    return false;
  }

  elegido(d: DestinoViaje) {
    console.log("elegido "+d.n);
    this.destinos.forEach(function (x) {x.setSelected(false);});
    d.setSelected(true);
  }
}
