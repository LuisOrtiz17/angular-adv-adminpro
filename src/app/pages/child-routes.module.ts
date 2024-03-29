import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './mantenimientos/usuario/usuario.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
          {path:'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
          {path:'grafica1', component: Grafica1Component, data: {titulo: 'Grafica #1'}},
          {path:'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajuste de cuenta'}},
          {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
          {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
          {path: 'perfil', component: PerfilComponent, data: {titulo: 'perfil de usuario'}},
          {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busquedas'}},
          //{path:'', redirectTo:'/dashboard', pathMatch: 'full'},
          //Mantenimientos
          {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'}},
          {path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos'}},
          {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medicos'}},

          // RUTAS DE ADMIN
          {path: 'usuarios', canActivate: [AdminGuard], component: UsuarioComponent, data: {titulo: 'Usuario de aplicación'}}
]



@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
