import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ArticulosService } from '../articulos.service';
import type { ClienteOption, Factura, SucursalOption } from '../articulos.service';

@Component({
  selector: 'app-facturas',
  standalone: false,
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  facturas: Factura[] = [];
  currentPage = 1;
  pageSize = 10;
  total = 0;
  totalPages = 0;
  targetPage = 1;
  loading = false;
  loadingOptions = false;
  errorMessage = '';
  optionsErrorMessage = '';
  sucursales: SucursalOption[] = [];
  clientes: ClienteOption[] = [];
  filters = {
    sucursalId: null as number | null,
    clienteId: null as number | null,
    month: '',
    status: ''
  };

  constructor(
    private articulosService: ArticulosService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarOpciones();
    this.cargarFacturas();
  }

  cargarOpciones(): void {
    this.loadingOptions = true;
    this.optionsErrorMessage = '';
    let pendingRequests = 2;
    const finishRequest = (): void => {
      pendingRequests -= 1;
      this.loadingOptions = pendingRequests > 0;
      this.cdr.detectChanges();
    };

    this.articulosService.recuperarSucus().subscribe({
      next: (sucursales) => {
        this.sucursales = sucursales;
        finishRequest();
      },
      error: (error: unknown) => {
        console.error('Error recuperando sucursales para filtrar facturas:', error);
        this.optionsErrorMessage = 'No se pudieron cargar las sucursales para los filtros.';
        finishRequest();
      }
    });

    this.articulosService.recuperarClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        finishRequest();
      },
      error: (error: unknown) => {
        console.error('Error recuperando clientes para filtrar facturas:', error);
        this.optionsErrorMessage = 'No se pudieron cargar los clientes para los filtros.';
        finishRequest();
      }
    });
  }

  cargarFacturas(): void {
    this.loading = true;
    this.errorMessage = '';

    this.articulosService.recuperarFacturas(this.currentPage, this.pageSize, this.filters).subscribe({
      next: (response) => {
        this.facturas = response.data;
        this.total = response.total;
        this.totalPages = response.totalPages;
        this.currentPage = response.page;
        this.targetPage = response.page;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error recuperando facturas:', error);
        this.errorMessage = 'No se pudieron cargar las facturas. Intenta nuevamente.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cambiarPagina(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
    this.cargarFacturas();
  }

  irAPagina(): void {
    const page = Number(this.targetPage);
    if (!Number.isInteger(page) || page < 1 || page > this.totalPages) {
      this.targetPage = this.currentPage;
      return;
    }

    this.cambiarPagina(page);
  }

  aplicarFiltros(): void {
    this.currentPage = 1;
    this.targetPage = 1;
    this.cargarFacturas();
  }

  limpiarFiltros(): void {
    this.filters = { sucursalId: null, clienteId: null, month: '', status: '' };
    this.aplicarFiltros();
  }

  seleccionarSucursal(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filters.sucursalId = value ? Number(value) : null;
  }

  seleccionarCliente(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filters.clienteId = value ? Number(value) : null;
  }

  seleccionarMes(event: Event): void {
    this.filters.month = (event.target as HTMLInputElement).value;
  }

  seleccionarEstado(event: Event): void {
    this.filters.status = (event.target as HTMLSelectElement).value;
  }

  seleccionarPageSize(event: Event): void {
    this.pageSize = Number((event.target as HTMLSelectElement).value);
  }

  actualizarPagina(event: Event): void {
    this.targetPage = Number((event.target as HTMLInputElement).value);
  }

  get firstRecord(): number {
    return this.total === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get lastRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.total);
  }
}
