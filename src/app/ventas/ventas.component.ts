import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../articulos.service';
@Component({
  providers: [ArticulosService],
  selector: 'app-ventas',
  standalone:false,
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas : any=[];
  sales :any=Array(Array());
  meses: any=[];
  sucursales:any=[];
  constructor(private VentServ:ArticulosService) { }

  ngOnInit(): void {
this.getMeses();
this.getSucus();
this.getVentas();

  }

getVentas()
{
    this.VentServ.recuperarVentas().subscribe(ppp => {this.ventas = (ppp);
 //alert (JSON.stringify(this.ventas.length));
   for (let m=0;m<this.ventas.length;m++){
     this.sales[m]=[];
     for (let s= 0; s<5;s++){
       this.sales[m][s] = this.ventas[m][s];
     }
     // alert (JSON.stringify(this.sales));
   };
   });
}

    getMeses(){
  this.VentServ.recuperarMeses().subscribe(mm=> {this.meses = mm});
  }
getSucus(){
  this.VentServ.recuperarSucus().subscribe(sss=> {this.sucursales = sss});
}
  
}
