import { Component, OnInit } from '@angular/core';
import { NegociosService } from '../../../servicios/negocios.service';
import { ItemNegocioDTO } from '../../../dto/item-negocio-dto';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../servicios/token.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-aprobar-negocios',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterModule,HeaderComponent],
  templateUrl: './aprobar-negocios.component.html',
  styleUrl: './aprobar-negocios.component.css'
})
export class AprobarNegociosComponent implements OnInit {

   negociosAprobados: ItemNegocioDTO[];
   negociosPendientes: ItemNegocioDTO[];
   negociosRechazados: ItemNegocioDTO[];


  constructor(
    private negocioService: NegociosService,
    private tokenService: TokenService,
    private router: Router
  ) {
 
    this.listarNegociosAprobados();
    this.listarNegociosPendientes();
    this.listarNegociosRechazados();
    this.negociosAprobados = [];
    this.negociosPendientes = [];
    this.negociosRechazados= [];
  }
  ngOnInit(): void {
    
  }


  public listarNegociosAprobados(){
    
    this.negocioService.listarPorEstado("APROBADO").subscribe({
    next: (data) => {
    this.negociosAprobados = data.respuesta;
    },
    error: (error) => {
    console.error(error);
    }
    });
  }

  public listarNegociosPendientes(){
    
    this.negocioService.listarPorEstado("PENDIENTE").subscribe({
    next: (data) => {
    this.negociosPendientes = data.respuesta;
    },
    error: (error) => {
    console.error(error);
    }
    });
  }

  public listarNegociosRechazados(){
    
    this.negocioService.listarPorEstado("RECHAZADO").subscribe({
    next: (data) => {
    this.negociosRechazados = data.respuesta;
    },
    error: (error) => {
    console.error(error);
    }
    });
  }

  public irARevisarNegocio( idNegocio : string){
    window.sessionStorage.setItem('idNegocioGestion', idNegocio);
    this.router.navigate(['/revisar-negocio']);
  }
}
