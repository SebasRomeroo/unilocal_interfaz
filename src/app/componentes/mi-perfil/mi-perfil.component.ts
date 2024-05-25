import { Component, OnInit } from '@angular/core';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import { DetalleClienteDTO } from '../../dto/detalle-cliente-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule,FormsModule, AlertaComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent implements OnInit {


  cliente!: DetalleClienteDTO;
  clienteNuevo!: DetalleClienteDTO;
  alerta !: Alerta;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private tokenService: TokenService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    const codigoCliente = this.tokenService.getCodigo();

    if (codigoCliente !== null) {
      this.clienteService.obtenerCliente(codigoCliente).subscribe({
        next: (data) => {
        this.alerta = new Alerta('Se ha cargado correctamente.', "success");
        this.cliente = data.respuesta;
        },
        error: (error) => {
        this.alerta = new Alerta('Ha ocurrido un error cargando el negocio.', "danger");
        }
      });
      
    } else {
      console.error('No se proporcionó ningún código de negocio.');
    }
  }

    
  actualizarPerfil() {
    this.clienteService.actualizarPerfil(this.cliente).subscribe({
      next: (data) => {
      this.alerta = new Alerta('Se ha actualizado correctamente.', "success");
      },
      error: (error) => {
      this.alerta = new Alerta('Ha ocurrido un error actualizando el cliente.', "danger");
      }
    });
  }
  desactivarCuenta(idCliente: string) {
    this.clienteService.desactivarCuenta(idCliente).subscribe({
      next: (data) => {
      this.alerta = new Alerta('Se ha desactivado correctamente.', "success");
      this.authService.noLogged();
      },
      error: (error) => {
      this.alerta = new Alerta('Ha ocurrido un error cargando el negocio.', "danger");
      }
    });
  }

}
