import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  //public ocultarModal: boolean = false;

  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor(public modalService: ModalImagenService, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    //this.ocultarModal = true;
    this.imgTemp = null;
    this.modalService.cerrarModal();
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

    const id = this.modalService.id;
    const tipo = this.modalService.tipo;
    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
    .then( img => {
      Swal.fire('Image Update', 'Imagen actualizada con exitó', 'success');

      this.modalService.nuevaImagen.emit(img);
      this.cerrarModal();
    }).catch( err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
    
  }

}
