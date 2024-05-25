import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/publico/login/login.component';
import { RegistroComponent } from './componentes/cliente/registro/registro.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { GestionNegocioComponent } from './componentes/negocio/gestion-negocio/gestion-negocio.component';
import { CrearNegocioComponent } from './componentes/negocio/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/negocio/detalle-negocio/detalle-negocio.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { AprobarNegociosComponent } from './componentes/moderador/aprobar-negocios/aprobar-negocios.component';
import { RevisarNegocioComponent } from './componentes/moderador/revisar-negocio/revisar-negocio.component';


export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'gestionNegocio', component: GestionNegocioComponent },
    { path: "crear-negocio", component: CrearNegocioComponent },
    { path: "detalle-negocio/:codigo", component: DetalleNegocioComponent },
    { path: "revisar-negocio", component: RevisarNegocioComponent },
    { path: "busqueda/:texto", component: BusquedaComponent },
    { path: "mi-perfil", component: MiPerfilComponent },
    // Ruta Moderador
    { path: "aprobarNegocio", component: AprobarNegociosComponent },

    { path: "**", pathMatch: "full", redirectTo: "" }
    ];