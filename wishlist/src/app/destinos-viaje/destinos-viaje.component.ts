import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-destinos-viaje',
  templateUrl: './destinos-viaje.component.html',
  styleUrls: ['./destinos-viaje.component.css']
})
export class DestinosViajeComponent {
  @Input() nombre:string;
  constructor() {
    this.nombre='';
  }
}
