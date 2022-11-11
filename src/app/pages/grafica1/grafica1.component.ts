import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {


   public labels1: string[] = [ 'Ventas', 'Stok', 'Compras' ];
   labels2: string[] = [ 'Ventas1', 'Stok1', 'Compras1' ];
   labels3: string[] = [ 'Ventas2', 'Stok2', 'Compras2' ];
   labels4: string[] = [ 'Ventas3', 'Stok3', 'Compras3' ];

   data :number[] = [ 350, 450, 500 ];
   data1 :number[] = [ 450, 400, 105 ];
   data2 :number[] = [ 550, 500, 300 ];
   data3 :number[] = [ 650, 200, 150 ];


  

  // public colors  :Color[] = [
  //   {}
  // ];

}
