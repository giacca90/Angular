import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { DestinosViajeComponent } from './destinos-viaje/destinos-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDettalleComponent } from './destino-dettalle/destino-dettalle.component';

const routes: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: ListaDestinosComponent},
  {path: 'Destino', component: DestinoDettalleComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    DestinosViajeComponent,
    ListaDestinosComponent,
    DestinoDettalleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
