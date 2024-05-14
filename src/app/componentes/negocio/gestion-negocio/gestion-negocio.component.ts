import { Component } from '@angular/core';
import { NegociosService } from '../../../servicios/negocios.service';
import { ItemNegocioDTO } from '../../../dto/item-negocio-dto';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-negocio',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './gestion-negocio.component.html',
  styleUrl: './gestion-negocio.component.css'
})
export class GestionNegocioComponent {

  seleccionados: ItemNegocioDTO[];
  textoBtnEliminar: string;

  negocios: ItemNegocioDTO[];
  constructor(private negocioService: NegociosService) {
    this.negocios = [];
    this.seleccionados = [];
    this.textoBtnEliminar = '';
    this.listarNegocios();
  }
  public listarNegocios() {
    this.negocios = this.negocioService.listar();
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
