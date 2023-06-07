import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private busquedaService: BusquedasService,
    private modalService: ModalImagenService
    ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalService.nuevaImagen
    .pipe(
      delay(200)
    ).subscribe( img => {this.cargarMedicos()});
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
    .subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  buscar(termino: string){
     if( termino.length === 0){
       return this.cargarMedicos();
     }

    this.busquedaService.buscar('medicos', termino)
    .subscribe(
      (resultados) => {
        console.log(resultados);
        
        this.medicos = resultados;
      }
    );
    //return this.hospitales;
  }

  abrirModal(medico: Medico){
    this.modalService.abrirModal('medicos', medico._id!, medico.img);
  }

  async borrarMedico(medico: Medico){

    return Swal.fire({
      title: '¿Borrar medico?',
      text: `Esta por eliminar el medico ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.deleteMedico(medico._id!).subscribe((resp) => {
          Swal.fire(
            'Medico eliminado!',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );
          this.cargarMedicos();
        });
      }
    });
  }

}
