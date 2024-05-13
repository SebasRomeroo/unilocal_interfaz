import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { GestionNegocioComponent } from './componentes/gestion-negocio/gestion-negocio.component';


export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'gestionNegocio', component: GestionNegocioComponent },
    { path: "**", pathMatch: "full", redirectTo: "" }
    ];