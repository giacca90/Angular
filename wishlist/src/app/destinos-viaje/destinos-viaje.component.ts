import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-destinos-viaje',
  templateUrl: './destinos-viaje.component.html',
  styleUrls: ['./destinos-viaje.component.css']
})
export class DestinosViajeComponent {
  @Input() destino: DestinoViaje;
  @Input() position: number;
  @HostBinding('attr.class') cssClass='col-md-4'
  @Output() clicked: EventEmitter<DestinoViaje>

  constructor(){
    this.position=0;
    this.destino=DestinoViaje.prototype; 
    this.clicked= new EventEmitter();
  }

  ir() {
    console.log("Ir "+this.destino.n);
    this.clicked.emit(this.destino);
    return false;
  }
}
