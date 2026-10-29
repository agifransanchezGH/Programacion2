import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common'

import { ArticulosService } from '../articulos.service';

@Component({
  providers: [ArticulosService],
  standalone: false,
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  meses: any = [];

  clients: any = [];

  constructor(
    private artServ: ArticulosService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.recuperarClientes();

  }
  recuperarClientes(): void {
    this.artServ.recuperarClientes().subscribe({
      next: (p99) => {
        console.log('Clientes recibidos:', p99);

        this.clients = p99;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error recuperando clientes:', error);
      }
    });
  }
}
