import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {

      this.usuario = usuarioService.usuario;
     }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil(){
    //console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe( resp => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      //console.log(this.usuario);

      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
 
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
    
  }

  cambiarImagen( event : any ) {
    const file: File = event.target.files[0];
    this.imagenSubir = file;
  
    //console.log(event);
    if( !file ){ 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      
    }
    return this.imgTemp;
    
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
    .then( img => {
      this.usuario.img = img;
      Swal.fire('Image Update', 'Imagen actualizada con exitó', 'success');
    }).catch( err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
    
  }

}
