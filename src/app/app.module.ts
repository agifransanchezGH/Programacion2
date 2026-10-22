import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ClientesComponent } from './clientes/clientes.component';
import { ListaSucursalesComponent } from './lista-sucursales/lista-sucursales.component';
import { VentasComponent } from './ventas/ventas.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ListaSucursalesComponent,
    VentasComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
