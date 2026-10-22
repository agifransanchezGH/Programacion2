import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../articulos.service';

@Component({
 
  selector: 'app-lista-sucursales',
  templateUrl: './lista-sucursales.component.html',
  standalone:false,
  styleUrls: ['./lista-sucursales.component.css'],
  providers: [ArticulosService]
})
export class ListaSucursalesComponent implements OnInit {
sucursales:any=[];

  constructor(private sucServ:ArticulosService) { }

  ngOnInit(): void {
  this.recuperarSucus();
  }
  recuperarSucus(){
    this.sucServ.recuperarSucus().subscribe(ss => {this.sucursales = (ss);
  //alert (JSON.stringify(this.sucursales));
  });
}

}