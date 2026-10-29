import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ArticulosService } from '../articulos.service';
import { FacturasComponent } from './facturas.component';

describe('FacturasComponent', () => {
  let component: FacturasComponent;
  let fixture: ComponentFixture<FacturasComponent>;
  const response = {
    data: [{
      ID_factura: 1,
      fecha: '2026-10-29',
      sucursal_id: 1,
      cliente_id: 2,
      importe: 100,
      iva: 21,
      estado: 'Pagada'
    }],
    total: 3650,
    page: 1,
    pageSize: 10,
    totalPages: 365
  };
  const recuperarFacturas = vi.fn((page: number, _pageSize: number, _filters: unknown) =>
    of({ ...response, page })
  );
  const articulosServiceMock = {
    recuperarFacturas,
    recuperarSucus: vi.fn(() => of([{ ID_sucursal: 1, nombre: 'Centro' }])),
    recuperarClientes: vi.fn(() => of([{ ID_cliente: 2, nombre: 'Ana', apellido: 'Pérez' }]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [FacturasComponent],
      providers: [{
        provide: ArticulosService,
        useValue: articulosServiceMock
      }]
    }).compileComponents();

    recuperarFacturas.mockClear();
    fixture = TestBed.createComponent(FacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page of invoices on initialization', () => {
    expect(recuperarFacturas).toHaveBeenCalledWith(1, 10, {
      sucursalId: null,
      clienteId: null,
      month: '',
      status: ''
    });
    expect(component.facturas).toEqual(response.data);
    expect(component.total).toBe(3650);
    expect(component.totalPages).toBe(365);
    expect(component.sucursales).toHaveLength(1);
    expect(component.clientes).toHaveLength(1);
  });

  it('requests the selected page', () => {
    component.cambiarPagina(2);

    expect(recuperarFacturas).toHaveBeenLastCalledWith(2, 10, component.filters);
    expect(component.currentPage).toBe(2);
  });

  it('navigates directly to a valid page', () => {
    component.targetPage = 120;
    component.irAPagina();

    expect(recuperarFacturas).toHaveBeenLastCalledWith(120, 10, component.filters);
    expect(component.currentPage).toBe(120);
  });

  it('resets to the first page when filters change', () => {
    component.currentPage = 7;
    component.targetPage = 7;
    component.filters = { sucursalId: 3, clienteId: 4, month: '2026-10', status: 'Pendiente' };

    component.aplicarFiltros();

    expect(component.currentPage).toBe(1);
    expect(component.targetPage).toBe(1);
    expect(recuperarFacturas).toHaveBeenLastCalledWith(1, 10, {
      sucursalId: 3,
      clienteId: 4,
      month: '2026-10',
      status: 'Pendiente'
    });
  });

  it('validates direct page navigation', () => {
    component.targetPage = 366;
    component.irAPagina();

    expect(component.targetPage).toBe(1);
    expect(recuperarFacturas).toHaveBeenCalledTimes(1);
  });
});
