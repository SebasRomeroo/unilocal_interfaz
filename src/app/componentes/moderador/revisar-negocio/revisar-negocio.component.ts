import { Component, OnInit } from '@angular/core';
import { NegociosService } from '../../../servicios/negocios.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetalleNegocioDTO } from '../../../dto/detalle-negocio-dto';
import { FormsModule } from '@angular/forms';
import { RegistroRevisionNegocioDTO } from '../../../dto/registro-revision-negocio-dto';
import { TokenService } from '../../../servicios/token.service';
import { Alerta } from '../../../dto/alerta';
import { AlertaComponent } from '../../alerta/alerta.component';

@Component({
  selector: 'app-revisar-negocio',
  standalone: true,
  imports: [CommonModule,FormsModule, AlertaComponent],
  templateUrl: './revisar-negocio.component.html',
  styleUrl: './revisar-negocio.component.css'
})
export class RevisarNegocioComponent implements OnInit{


  codigoNegocio: any;
  negocio: DetalleNegocioDTO| undefined;
  RegistroRevisionNegocioDTO: RegistroRevisionNegocioDTO;
  nuevoComentario: string = '';
  calificacion: number = 0;
  alerta !: Alerta;

  constructor(
    private route: ActivatedRoute,
    private negociosService: NegociosService,
    private tokenService: TokenService
) {
    this.route.params.subscribe((params) => {
    this.codigoNegocio = params['codigo'];
    //this.obtenerNegocio();
    });
    this.alerta= new Alerta("","");

    this.RegistroRevisionNegocioDTO = new RegistroRevisionNegocioDTO();
  }

 ngOnInit(): void {
  //const codigoNegocio = this.route.snapshot.paramMap.get('codigoNegocio');
  const codigoNegocio = sessionStorage.getItem('idNegocioGestion');

    if (codigoNegocio !== null) {
      this.negociosService.obtener(codigoNegocio).subscribe({
        next: (data) => {
        this.alerta = new Alerta('Se ha cargado correctamente.', "success");
        this.negocio = data.respuesta;
        },
        error: (error) => {
        this.alerta = new Alerta('Ha ocurrido un error cargando el negocio.', "danger");
        }
      });
      
    } else {
      console.error('No se proporcionó ningún código de negocio.');
    }
  }

  registrarRevision(codigoNegocio: any) 
  {
    
    this.RegistroRevisionNegocioDTO.codigoModerador = this.tokenService.getCodigo();
    this.RegistroRevisionNegocioDTO.codigoNegocio = codigoNegocio;

      this.negociosService.crearRevision(this.RegistroRevisionNegocioDTO).subscribe({
        next: (data) => {
        this.alerta = new Alerta(data.respuesta, "success");
        },
        error: (error) => {
        this.alerta = new Alerta(error.error.respuesta, "danger");
        }
      });
  }
}
