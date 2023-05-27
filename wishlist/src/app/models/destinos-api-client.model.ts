import { BehaviorSubject, Observer, Subject } from 'rxjs';
import { DestinoViaje } from './destino-viaje.model';

export class DestinosApiClient {
	destinos:DestinoViaje[];
	current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);
	constructor() {
       this.destinos = [];
	}
	add(d:DestinoViaje){
	  this.destinos.push(d);
	}
	getAll():DestinoViaje[]{
	  return this.destinos;
    }
	getById(id:String | null):DestinoViaje{
	  return this.destinos.filter(function(d){return d.id.toString() == id;})[0];
    }
	elegir(d: DestinoViaje)  {
		this.destinos.forEach(x => x.setSelected(false));
		d.setSelected(true);
		this.current.next(d);
	}
	subscribeOnChange(fn: Partial<Observer<DestinoViaje>> | ((value: DestinoViaje) => void) | undefined)  {
		this.current.subscribe(fn);
	}
}