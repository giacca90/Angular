import { Component, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;

  constructor(fb: FormBuilder) {
    this.onItemAdded= new EventEmitter();
    this.fg= fb.group({
      nombre: ['', Validators.required],
      url: ['']
    });

    this.fg.valueChanges.subscribe ((form: any) => {
      console.log('cambio de formulario: ', form)
    })
  }  
  
  guardar(nombre: string, url: string): boolean  {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }
}
