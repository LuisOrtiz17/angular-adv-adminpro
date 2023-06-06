import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../models/medico.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }


  get headers(): any{
    return {
        'x-token': this.token
      
    };
  }

  get headersTwo(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  cargarMedicos(): Observable<Medico[]>{

    const url = `${base_url}/medicos`;

    return this.http.get<{ ok: boolean, medicos: Medico[] }>(url, this.headersTwo)
    .pipe(
      map( (resp: {ok: boolean, medicos: Medico[] }) => resp.medicos)
    );
  }

  findMedicoById(id: string){
    const url = `${base_url}/medicos/${ id }`;

    return this.http.get<{ ok: boolean, medico: Medico }>(url, this.headersTwo)
    .pipe(
      map( (resp: {ok: boolean, medico: Medico }) => resp.medico)
    );
  }

  crearMedico(medico: {nombre: string, hospital: string}){

    const url = `${base_url}/medicos`;

    return this.http.post(url, medico, this.headersTwo);
  }

  updateMedico(medico: Medico){

    const url = `${base_url}/medicos/${medico._id}`;

    return this.http.put(url, medico, this.headersTwo);
  }

  deleteMedico(_id: string){

    const url = `${base_url}/medicos/${_id}`;

    return this.http.delete(url, this.headersTwo);
  }
}