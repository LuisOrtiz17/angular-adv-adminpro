import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm?: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({ id }) => {
      this.cargarMedico(id);
      
    })

    this.medicoForm = this.fb.group({
      nombre: ['Luis', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
    .subscribe( hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
      
    })
  }

  cargarMedico(id: string){

    if( id === 'nuevo' ){
      return;
    }

    this.medicoService.findMedicoById(id)
    .pipe(
      delay(100)
    )
    .subscribe( (medico: any) => {

      if( !medico ){
        return this.router.navigateByUrl(`/dashboard/medicos`);
      }
      const { nombre, hospital:{ _id } } = medico;
      this.medicoSeleccionado = medico;
      this.medicoForm?.setValue({ nombre, hospital: _id});
      return null;
    });
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
    .subscribe( (hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      
    });
  }

  guardarMedico(){

    if( this.medicoSeleccionado) {
      //Actualizar
      const data = {
        ...this.medicoForm?.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.updateMedico( data )
      .subscribe( resp => {
        Swal.fire('Actualizado', `${ data.nombre } actualizado correctamente`, 'success')
      });
    } else {

      const { nombre } = this.medicoForm?.value;
      this.medicoService.crearMedico(this.medicoForm?.value)
      .subscribe( (resp: any) => {
        Swal.fire('Creado', `${nombre} creado correctamente!`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id}`)
      });

    }

    
  }

}
