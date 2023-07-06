import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
<<<<<<< HEAD:wishlist/src/app/app.component.ts
  title = 'angular-whishlist';
  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000)
  })

  destinoAgregado(d) {
  	//alert(d.nombre);
  }
=======
  title = 'angular-hola-mundo';
>>>>>>> 91e5b68 (Primera parte NgRx):angular-hola-mundo/src/app/app.component.ts
}
