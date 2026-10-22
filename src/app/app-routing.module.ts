import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSucursalesComponent } from './lista-sucursales/lista-sucursales.component'; 
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  {path: 'sucursales', component: ListaSucursalesComponent },
{ path: 'clientes', component: ClientesComponent },
{ path: 'inicio', component: HomeComponent },
{path: 'Ventas', component: VentasComponent},
{ path:'', redirectTo: '/inicio', pathMatch: 'full'}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
