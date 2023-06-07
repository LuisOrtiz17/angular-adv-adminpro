import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  //menuItems: any[];
  public imgUrl = '';
  public name = '';

  constructor(public sidebarService: SidebarService, private usuarioService: UsuarioService) { 
    //this.menuItems = sidebarService.menu;
    this.imgUrl = usuarioService.usuario.imagenUrl;
    this.name = usuarioService.usuario.nombre;
  }

  ngOnInit(): void {
  }

}
