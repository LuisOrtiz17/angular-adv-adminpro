import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public imgUrl = '';
  public name = '';
  public email = '';

  constructor(private usuarioService: UsuarioService) {
    this.imgUrl = usuarioService.usuario.imagenUrl;
    this.name = usuarioService.usuario.nombre;
    this.email = usuarioService.usuario.email;
   }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

}
