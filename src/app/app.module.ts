import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ClientesComponent } from './clientes/clientes.component';
import { ListaSucursalesComponent } from './lista-sucursales/lista-sucursales.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './item/item.component';
import { FacturasComponent } from './facturas/facturas.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ListaSucursalesComponent,
    HomeComponent,
    ItemComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [provideZoneChangeDetection({ eventCoalescing: true})],
  bootstrap: [AppComponent]
})
export class AppModule { }
