import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  public usuario!: Usuario;
  constructor(private router: Router, private http: HttpClient, private ngZone: NgZone ) {

  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role!;
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage( token: string, menu: any){
    localStorage.setItem('token', token);
        localStorage.setItem('menu', JSON.stringify(menu) );
  }


  logout(){
    localStorage.removeItem('token');
    // TODO: Borrar Menu
    localStorage.removeItem('menu');
    
    if( this.usuario.google ){

      google.accounts.id.revoke(`${this.usuario.email}`, () => {
  
        this.ngZone.run(() => {
          return this.router.navigateByUrl('/login');
        })
  
      })
    }

    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean>{

    //const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img='', uid} = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError( error => of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
    //console.log('Creando usuario');
  }

  actualizarPerfil( data: {email: string, nombre: string, role: string}){

    data = {
      ...data,
      role: this.usuario.role!
    };
    

   return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)
  }

  login(formData: any) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
    //console.log('Creando usuario');
  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap( (resp: any ) => {
        console.log(resp)
        this.guardarLocalStorage(resp.token, resp.menu);
        
      })
    )
  }

  cargarUsuarios(desde: number = 0){

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
    .pipe(
      //delay(5000),
      map( resp => {

        const usuarios = resp.usuarios.map( 
          user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
          );

        return {
          total: resp.total,
          usuarios
        };
      })
    )
  }

  eleminarUsuario(usuario: Usuario){
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
    
  }

  guardarUsuario( usuario: Usuario){

   return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers)
  }
}
