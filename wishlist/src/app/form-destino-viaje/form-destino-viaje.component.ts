import { Component, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud: number = 3;
  searchResults: string[] | any = [];

  constructor(fb: FormBuilder) {
    this.onItemAdded= new EventEmitter();
    this.fg= fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['']
    });

    this.fg.valueChanges.subscribe ((form: any) => {
      console.log('cambio de formulario: ', form)
    });

  }  

  ngOnInit()  {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
    .pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter((text => text.length > 2)),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => ajax('./assets/datos.json'))
    ).subscribe(AjaxResponse => {
      console.log(AjaxResponse);
      console.log(AjaxResponse.response);
      this.searchResults = AjaxResponse.response;
    }); 
  }
  
  guardar(nombre: string, url: string): boolean  {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): {[s: string]: boolean} | null  {
    const l = control.value.toString().trim().length;
    if(l>0 && l<3)  {
      return {invalidNombre: true};
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn | ((control: FormControl) => { [s: string]: boolean; } | null)  {
    return (control: FormControl): {[s: string]: boolean} | null => {
      const l = control.value.toString().trim().length;
      if(l>0 && l<minLong)  {
        return {minLongNombre: true};
      }
      return null;
    }
  }
}
