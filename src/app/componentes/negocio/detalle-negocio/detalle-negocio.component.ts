import { Component, OnInit } from '@angular/core';
import { ItemNegocioDTO } from '../../../dto/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../../servicios/negocios.service';
import { MapaService } from '../../../servicios/mapa.service';
import { CommonModule } from '@angular/common';
import { DetalleNegocioDTO } from '../../../dto/detalle-negocio-dto';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css'
})
export class DetalleNegocioComponent implements OnInit {
  codigoNegocio: string = '';
  negocio: DetalleNegocioDTO| undefined;
  nuevoComentario: string = '';
  calificacion: number = 0;

  constructor(private route: ActivatedRoute, private negociosService: NegociosService, private mapaService: MapaService) {
    this.route.params.subscribe((params) => {
    this.codigoNegocio = params['codigo'];
    //this.obtenerNegocio();
    });
  }

 ngOnInit(): void {
   const codigoNegocio = this.route.snapshot.paramMap.get('codigoNegocio');
  console.log('ejecuta v1', codigoNegocio);
    if (codigoNegocio !== null) {
      this.negociosService.obtener(this.codigoNegocio).subscribe({
        next: (data) => {
        //this.alerta = new Alerta(data.respuesta, "success");
        this.negocio = data.respuesta;
        },
        error: (error) => {
        //this.alerta = new Alerta(error.error.respuesta, "danger");
        alert('No se encontró ningún negocio con el código proporcionado.');
        }
        });
      
    } else {
      console.error('No se proporcionó ningún código de negocio.');
    }
  }

 /* iniciarMapa(): void {
    
    if (this.negocio && this.negocio.ubicacion) {
      // Esperar un pequeño tiempo para asegurarse de que el contenedor del mapa está en el DOM
      setTimeout(() => {
        this.mapaService.crearMapa();
        this.mapaService.pintarMarcadores([this.negocio!]);
      }, 0);
    }/** */
  
  

/*  calificar(estrellas: number): void {
    this.calificacion = estrellas;
  } /** */

 public obtenerNegocio() 
  {
    const negocioConsultado = this.negociosService.obtener(this.codigoNegocio);
    if (negocioConsultado != undefined) {
    //this.negocio = negocioConsultado;
    }
  }

 /* agregarComentario() {
    // Aquí deberías llamar al método del servicio de comentarios para agregar un comentario al negocio
    this.negociosService.crearComentario(this.codigoNegocio, this.nuevoComentario);
    // Limpia el campo del nuevo comentario después de agregarlo
    this.nuevoComentario = '';
    // Vuelve a cargar el negocio para actualizar la lista de comentarios
    this.obtenerNegocio();
  } */
}