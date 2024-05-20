import { Component, OnInit } from '@angular/core';
import { NegociosService } from '../../../servicios/negocios.service';
import { ItemNegocioDTO } from '../../../dto/item-negocio-dto';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../servicios/token.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-gestion-negocio',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule, HeaderComponent],
  templateUrl: './gestion-negocio.component.html',
  styleUrl: './gestion-negocio.component.css'
})
export class GestionNegocioComponent implements OnInit {

  seleccionados: ItemNegocioDTO[];
  textoBtnEliminar: string;

  negocios: ItemNegocioDTO[];
  router: any;
  constructor(
    private negocioService: NegociosService,
    private tokenService: TokenService
  ) {
    this.negocios= [];
    this.router ='';
    this.seleccionados = [];
    this.textoBtnEliminar = '';
    this.listarNegocios();
  }
  ngOnInit(): void {
    
  }
  public listarNegocios() {
    this.negocioService.listarNegocios().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
        //this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
  }

  public seleccionar(producto: ItemNegocioDTO, estado: boolean) {
    if (estado) {
    this.seleccionados.push(producto);
    } else {
    this.seleccionados.splice( this.seleccionados.indexOf(producto), 1 );
    }
    this.actualizarMensaje();
  }
  
  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
    if (tam == 1) {
    this.textoBtnEliminar = "1 elemento";
    } else {
    this.textoBtnEliminar = tam + " elementos";
    }
    } else {
    this.textoBtnEliminar = "";
    }
  }

  public borrarNegocios() {
    this.seleccionados.forEach(n => {
    this.negocioService.eliminar(n.codigoNegocio);
    this.negocios = this.negocios.filter(negocio => negocio.codigoNegocio !== n.codigoNegocio);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

}
