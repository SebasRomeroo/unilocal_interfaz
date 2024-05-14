import { Component } from '@angular/core';
import { RegistroClienteDTO } from '../../../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  registroClienteDTO: RegistroClienteDTO;
  ciudades: string[]; 
  archivos!:FileList;
  
  constructor() {
    this.registroClienteDTO = new RegistroClienteDTO();
    this.ciudades = [];
    this.cargarCiudades();
  }

  public registrar() {
    if (this.registroClienteDTO.fotoPerfil != "") {
    console.log(this.registroClienteDTO);
    } else {
    console.log("Debe cargar una foto");
    }
  }

  //Gestionar contraseña y confirmación
  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmaPassword;
  }

  private cargarCiudades() {
    console.log('Se inicia');
    this.ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
    }
  }
}
