import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      this.usuarioService.validarToken();

      //console.log('Paso por el canActivate del guard');
      
    return this.usuarioService.validarToken()
    .pipe(
      tap( estaAuth => {
        if( !estaAuth ){
          this.router.navigateByUrl('/login');
        }
      })
    )
  }
  
}
