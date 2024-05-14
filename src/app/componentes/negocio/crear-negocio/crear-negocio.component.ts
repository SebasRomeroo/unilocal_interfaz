import { Component } from '@angular/core';
import { HorarioDTO } from '../../../dto/horario-dto';
import { NegociosService } from '../../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroNegocioDTO } from '../../../dto/registro-negocio-dto';

@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent {
  registroNegocioDTO: RegistroNegocioDTO;
  horarios: HorarioDTO[];
  archivos!:FileList;

  constructor(private negociosService: NegociosService) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [ new HorarioDTO() ];
  }

  public crearNegocio() {
    this.registroNegocioDTO.horarios = this.horarios;
    this.negociosService.crear(this.registroNegocioDTO);
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
}
