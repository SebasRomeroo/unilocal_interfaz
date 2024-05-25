import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { DetalleClienteDTO } from '../dto/detalle-cliente-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteURL = "http://localhost:8080/api/clientes";

  constructor(private http: HttpClient,private tokenService: TokenService) { }

  public obtenerCliente(idCuenta: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/obtener/${idCuenta}`);
  }
  
  public desactivarCuenta(codigo: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/eliminar/${codigo}`);
  }

  public actualizarPerfil(clienteActualizado: DetalleClienteDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.clienteURL}/editar-perfil`, clienteActualizado);
  }
}
