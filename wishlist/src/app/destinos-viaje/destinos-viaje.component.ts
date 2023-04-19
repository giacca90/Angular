import { Component, HostBinding, Input } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje-model';

@Component({
  selector: 'app-destinos-viaje',
  templateUrl: './destinos-viaje.component.html',
  styleUrls: ['./destinos-viaje.component.css']
})
export class DestinosViajeComponent {
  @Input() destino:DestinoViaje;
  @HostBinding('attr.class') cssClass='col-md-4'

  constructor(){
    this.destino=DestinoViaje.prototype;
  }
}
