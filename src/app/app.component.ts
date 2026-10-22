import { Component, OnInit } from '@angular/core';
import { ArticulosService } from './articulos.service';





@Component({
  providers: [ArticulosService],
  standalone:false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{

  title = 'AngPHP';
  articulos : any=[];
  datos :any=[];
  meses : any=[];
  sucursales : any=[];
  clientes : any=[];
  ventas : any=[];
  sales :any=Array(Array());
  art = {
    codigo: null,
    descripcion: null,
    precio: null

  };
  mes = {
    Nro:null,
    Mes: null,
    CDias: null
  };
kk:number =10;
  
  
  
  constructor(private articulosServicio: ArticulosService) {}
// constructor() {}
  ngOnInit() {

  }  

}


