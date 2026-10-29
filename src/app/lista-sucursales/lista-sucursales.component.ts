import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
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

  constructor(
    private sucServ:ArticulosService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  this.recuperarSucus();
  }
 recuperarSucus(): void {
    this.sucServ.recuperarSucus().subscribe({
      next: (ss) => {
        console.log('Respuesta del servidor:', ss);

        this.sucursales = ss;

        // Fuerza la actualización de la vista
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error recuperando sucursales:', error);
      }
    });
  }
}