import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSucursalesComponent } from './lista-sucursales/lista-sucursales.component'; 
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';

import { ItemComponent } from './item/item.component';
import { FacturasComponent } from './facturas/facturas.component';
import { LoginComponent } from './login/login';

const routes: Routes = [
{path: 'sucursales', component: ListaSucursalesComponent },
{ path: 'clientes', component: ClientesComponent },
{ path: 'inicio', component: HomeComponent },
{ path: 'catalogo', component: ItemComponent},
{ path: 'facturas', component: FacturasComponent },
{ path: 'login', component: LoginComponent },
{ path:'', redirectTo: 'login', pathMatch: 'full'}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
