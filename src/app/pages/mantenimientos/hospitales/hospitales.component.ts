import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;

  private imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private busquedaService: BusquedasService, 
    private modalService: ModalImagenService
    ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalService.nuevaImagen
    .pipe(
      delay(200)
    ).subscribe( img => {this.cargarHospitales()});    
  }

  cargarHospitales(){
    this.cargando = true;

    this.hospitalService.cargarHospitales()
    .subscribe( hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
    });
  }

  guardarCambios(hospital: Hospital){
    
    this.hospitalService.updateHospitales(hospital._id!, hospital.nombre)
    .subscribe( resp => {
      Swal.fire( 'Actualizado', hospital.nombre, 'success');
    });
  }

  eliminarHospital(hospital: Hospital){
    
    this.hospitalService.deleteHospitales(hospital._id!)
    .subscribe( resp => {
      this.cargarHospitales();
      Swal.fire( 'Borrado', hospital.nombre, 'success');
    });
  }

  async abrirSweetAlert(){
    const {value} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nuevo nombre del hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del hospital'
    })
    
    if( value?.trim().length! > 0){
        this.hospitalService.crearHospitales(value!)
        .subscribe( (hospital) => {
          this.hospitales.push(hospital);
        } )
    }
    
  }

  abrirModal(hospital: Hospital){
    this.modalService.abrirModal('hospitales', hospital._id!, hospital.img);
  }

  buscar(valor: string){
    if( valor.length === 0){
      return (this.hospitales = this.hospitalesTemp);
    }

    this.busquedaService.buscar('hospitales',valor)
    .subscribe(
      (resultados) => {
        console.log(resultados);
        
        this.hospitales = resultados;
      }
    );
    return this.hospitales;
  }

}
