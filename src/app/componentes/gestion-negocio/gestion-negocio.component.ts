import { Component } from '@angular/core';
import { NegociosService } from '../../servicios/negocios.service';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
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

  negocios: ItemNegocioDTO[];
  constructor(private negocioService: NegociosService) {
    this.negocios = [];
    this.listarNegocios();
  }
  public listarNegocios() {
    this.negocios = this.negocioService.listar();
  }
}
