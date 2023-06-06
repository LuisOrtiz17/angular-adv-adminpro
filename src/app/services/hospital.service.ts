import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  

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


  cargarHospitales(): Observable<Hospital[]>{

    const url = `${base_url}/hospitales`;

    //return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, {headers: this.headers})
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, this.headersTwo)
    .pipe(
      map( (resp: {ok: boolean, hospitales: Hospital[] }) => resp.hospitales)
    );
  }

  crearHospitales(nombre: string): Observable<Hospital>{

    const url = `${base_url}/hospitales`;

    //return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, {headers: this.headers})
    return this.http.post<{ ok: boolean, hospital: Hospital }>(url,{ nombre }, this.headersTwo)
    .pipe(
      map( (resp: {ok: boolean, hospital: Hospital }) => resp.hospital)
    );
  }

  updateHospitales(_id: string, nombre: string): Observable<Hospital>{

    const url = `${base_url}/hospitales/${_id}`;

    //return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, {headers: this.headers})
    return this.http.put<{ ok: boolean, hospital: Hospital }>(url,{ nombre }, this.headersTwo)
    .pipe(
      map( (resp: {ok: boolean, hospital: Hospital }) => resp.hospital)
    );
  }

  deleteHospitales(_id: string){

    const url = `${base_url}/hospitales/${_id}`;

    //return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, {headers: this.headers})
    return this.http.delete(url, this.headersTwo);
  }


}
