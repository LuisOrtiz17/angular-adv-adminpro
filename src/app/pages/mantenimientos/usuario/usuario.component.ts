import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [],
})
export class UsuarioComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs!: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalService: ModalImagenService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalService.nuevaImagen
    .pipe(
      delay(100)
    ).subscribe( img => {this.cargarUsuarios()});
  }

  cargarUsuarios() {
    this.cargando = true;

    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }
    this.busquedaService.buscar('usuarios', termino)
    .subscribe((resultados) => {
      this.usuarios = resultados as Usuario[];;
    });

    return this.usuarios;
  }

  async eliminarUser(usuario: Usuario) {

    if( usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error', "No puede borrarse a si mismo", 'error');
    }
    return Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta por eliminar el usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eleminarUsuario(usuario).subscribe((resp) => {
          Swal.fire(
            'Usuario eliminado!',
            `${usuario.nombre} fue eliminado correctamente`,
            'success'
          );
          this.cargarUsuarios();
        });
      }
    });

  }

  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario(usuario)
    .subscribe( resp => {console.log(resp)});
  }

  abrirModal(usuario: Usuario){
    this.modalService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }
}
