import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ArticulosService } from '../articulos.service';

@Component({
  selector: 'app-item.component',
  standalone: false,
  styleUrl: './item.component.css',
  templateUrl: './item.component.html',
  providers: [ArticulosService]
})
export class ItemComponent implements OnInit {

  items: any= [];

  constructor(
    private itmServ: ArticulosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.recuperarItems();
  }

  recuperarItems(): void {
    this.itmServ.recuperarItems().subscribe({
      next: (is) => {
        console.log('Respuesta del servidor:', is);

        this.items = is;

        // Fuerza la actualización de la vista
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error recuperando items:', error);
      }
    });
  }
}