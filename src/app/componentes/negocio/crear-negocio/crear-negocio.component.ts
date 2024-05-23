import { Component, OnInit } from '@angular/core';
import { HorarioDTO } from '../../../dto/horario-dto';
import { NegociosService } from '../../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroNegocioDTO } from '../../../dto/registro-negocio-dto';
import { MapaService } from '../../../servicios/mapa.service';
import { PublicoService } from '../../../servicios/publico.service';
import { Alerta } from '../../../dto/alerta';
import { AlertaComponent } from '../../alerta/alerta.component';

@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule,AlertaComponent ],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent implements OnInit {
  registroNegocioDTO: RegistroNegocioDTO;
  horarios: HorarioDTO[];
  archivos!:FileList;
  tiposNegocio: string[];
  alerta !: Alerta;

  constructor(private negociosService: NegociosService, private mapaService: MapaService, private publicoService: PublicoService) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [ new HorarioDTO() ];
    this.tiposNegocio= [];
    this.cargarTiposNegocio();
    this.alerta= new Alerta("","");


  }

  public crearNegocio() {
    
    // if (this.registroClienteDTO.fotoPerfil != "") {
      this.negociosService.crear(this.registroNegocioDTO).subscribe({
      next: (data) => {
      this.alerta = new Alerta(data.respuesta, "success");
      },
      error: (error) => {
      this.alerta = new Alerta(error.error.respuesta, "danger");
      }
      });
      //} else {
      this.alerta = new Alerta("Debe subir una imagen", "danger");
      //}
    console.log(this.registroNegocioDTO);
  }
  
  public agregarHorario() {
    this.horarios.push(new HorarioDTO());
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registroNegocioDTO.fotoPerfil = this.archivos[0].name;
    }
  }

  private cargarTiposNegocio() {
    this.publicoService.listarTiposNegocio().subscribe({
    next: (data) => {
    this.tiposNegocio = data.respuesta;
    },
    error: (error) => {
    console.log("Error al cargar las ciudades");
    }
    });
    }

  ngOnInit(): void {
    
    this.mapaService.crearMapa();

    this.mapaService.agregarMarcador().subscribe((marcador) => {
      console.log("Alerta",marcador);
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    });
    }
}
