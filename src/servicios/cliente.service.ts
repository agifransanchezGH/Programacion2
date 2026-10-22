import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
private url = 'http://localhost/agus/PHP/Get_clientes.php';
constructor (private http: HttpClient) {}

getClientes(){
    return this.http.get<any>(this.url);}
}
