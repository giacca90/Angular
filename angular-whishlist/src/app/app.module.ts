import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injectable, InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule as NgRxStoreModule, ActionReducerMap, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import Dexie from 'dexie';


import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http'
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import {
          DestinosViajesState,
          intializeDestinosViajesState,
          reducerDestinosViajes,
          DestinosViajesEffects,
          InitMyDataAction
        } from './models/destinos-viajes-state.model';
import { LoginComponent } from './components/login/login/login.component'  //'./components/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component'  //'./components/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { AuthService } from './services/auth.service';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component'  //'./components/vuelos/vuelos-main/vuelos-main.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component'   //'./components/vuelos/vuelos-mas-info/vuelos-mas-info.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalles-component/vuelos-detalles-component.component'  //'./components/vuelos/vuelos-detalle/vuelos-detalle.component';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { ReservasModule } from './reservas/reservas.module'  //'./components/vuelos/vuelos/vuelos.component';
import { env } from 'process';
import { DestinoViaje } from './models/destino-viaje.model';

// app config
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// fin app config

// app init
export function init_app(appLoadService: AppLoadService): () => Promise<any>  {
  return () => appLoadService.intializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) { }
  async intializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}

// fin app init

// init routing
export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponentComponent },
  { path: 'mas-info', component: VuelosMasInfoComponentComponent },
  { path: ':id', component: VuelosDetalleComponent },
];

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ListaDestinosComponent },
    { path: 'destino/:id', component: DestinoDetalleComponent },
    { path: 'login', component: LoginComponent },
    {
      path: 'protected',
      component: ProtectedComponent,
      canActivate: [ UsuarioLogueadoGuard ]
    },
    {
      path: 'vuelos',
      component: VuelosComponentComponent,
      canActivate: [ UsuarioLogueadoGuard ],
      children: childrenRoutesVuelos
    }
  ];
// fin routing

// redux init
export interface AppState {
  destinos: DestinosViajesState;
};
const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};
const reducersInitialState = {
    destinos: intializeDestinosViajesState()
};
// fin redux init

// dexie db
@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie {
  destinos: Dexie.Table<DestinoViaje, number>;
  constructor () {
      super('MyDatabase');
      this.version(1).stores({
        destinos: '++id, nombre, imagenUrl',
      });
  }
}

export const db = new MyDatabase();
// fin dexie db

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    LoginComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponent,
    VuelosMainComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule
  ],
  providers: [
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    MyDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}