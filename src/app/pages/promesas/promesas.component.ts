import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(users => {
      console.log(users);
      
    });

    const promesa = new Promise( (resolve, reject) => {

      if(false){
        resolve('Hola Mundo');
      }else {
        reject('Algo salio mal'); 
      }
      
      
    });

    promesa.then( (msj) => {

      console.log(msj);
      
    }).catch(
      error => console.log('Error en mi promesa: ', error)
      
    );

    console.log('Fin del INIT');
    
  }

  getUsuarios(){

    const promesa = new Promise( resolve => {

      fetch('https://reqres.in/api/users?page=2')
      .then( resp => resp.json())
      .then(body => resolve(body.data));

    });

    return promesa;
  }

    
  

}
