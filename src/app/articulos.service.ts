import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Factura {
  ID_factura: number;
  fecha: string;
  sucursal_id: number;
  cliente_id: number;
  importe: number;
  iva: number;
  estado: string;
}

export interface FacturasResponse {
  data: Factura[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SucursalOption {
  ID_sucursal: number;
  nombre: string;
}

export interface ClienteOption {
  ID_cliente: number;
  nombre: string;
  apellido: string;
}

@Injectable(
//  {  providedIn: 'root'}
  )
export class ArticulosService {
url= 'http://localhost/agus/PHP/';

  constructor(private http: HttpClient) { }

  recuperarItems() {
    return this.http.get(`${this.url}Get_items.php`);
  }
  recuperarSucus() {
    return this.http.get<SucursalOption[]>(`${this.url}Get_Sucus.php`);
  }
  recuperarClientes() {
    return this.http.get<ClienteOption[]>(`${this.url}Get_clientes.php`);
  }
  recuperarVentas() {
    return this.http.get(`${this.url}Get_Ventas.php`);
  }
  recuperarFacturas(
    page: number,
    pageSize: number,
    filters: { sucursalId: number | null; clienteId: number | null; month: string; status: string }
  ) {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    let filteredParams = params;
    if (filters.sucursalId !== null) {
      filteredParams = filteredParams.set('sucursal_id', filters.sucursalId);
    }
    if (filters.clienteId !== null) {
      filteredParams = filteredParams.set('cliente_id', filters.clienteId);
    }
    if (filters.month) {
      filteredParams = filteredParams.set('mes', filters.month);
    }
    if (filters.status) {
      filteredParams = filteredParams.set('estado', filters.status);
    }

    return this.http.get<FacturasResponse>(`${this.url}Get_facturas.php`, { params: filteredParams });
  }
  alta(articulo: { codigo: any ; descripcion: any; precio: any; }) {
 // alert (`${this.url}alta.php`);
    return this.http.post(`${this.url}alta.php`, JSON.stringify(articulo))/*.subscribe(data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      }
      
      );    */
    }
  

  baja(codigo:number) {
    return this.http.get(`${this.url}baja.php?codigo=${codigo}`);
  }
  
  seleccionar(codigo:number) {
    return this.http.get(`${this.url}seleccionar.php?codigo=${codigo}`);
  }

  modificacion(articulo: { codigo: null; descripcion: null; precio: null; }) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(articulo));    
  } 
}
