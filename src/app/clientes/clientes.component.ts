import { Component, OnInit } from '@angular/core';

import {CommonModule} from '@angular/common'

import { ArticulosService } from '../articulos.service';

@Component({
  providers: [ArticulosService],
  standalone:false,
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
meses:any=[];

clients:any=[];

  constructor(private artServ: ArticulosService) { }

  ngOnInit(): void {
   
     this.recuperarClientes();
   
  }
  recuperarClientes(): void {
  //  alert("pre");
    this.artServ.recuperarClientes().subscribe((p99): void => {this.clients = (p99)
    //  this.artServ.recuperarClientes().subscribe(p99 => {alert(JSON.stringify(p99));
  })
  //alert (JSON.stringify(this.clients));
  //alert("ost");
    }
    
}
