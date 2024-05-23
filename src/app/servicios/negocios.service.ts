import { Injectable } from '@angular/core';
import { RegistroNegocioDTO } from '../dto/registro-negocio-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MensajeDTO } from '../dto/mensaje-dto';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { ActualizacionNegocioDTO } from '../dto/actualizacion-negocio-dto';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {
  
  // private negocios = ItemNegocioDTO[];
  private negociosURL = "http://localhost:8080/api/negocios";
  private publicoURL = "http://localhost:8080/api/publico";

  constructor(private http: HttpClient,private tokenService: TokenService) { 

  // this.negocios = [];
  }

  public crear(negocioNuevo: RegistroNegocioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.negociosURL}/crear-negocio`, negocioNuevo);
  }
  public listarNegocios() {
    let params = new HttpParams().set('codigoCliente', this.tokenService.getCodigo());
    return this.http.get<MensajeDTO>(`${this.negociosURL}/mis-negocios`,{params});
  }
  
  public actualizar(actualizacionNegocio: ActualizacionNegocioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.negociosURL}/actualizar`, actualizacionNegocio);
  }

  /*public obtener(codigo: string): ItemNegocioDTO | undefined {
    return this.negocios.find((negocios: { codigoNegocio: string; }) => negocios.codigoNegocio == codigo);
  }/** */
  
  /*public obtener(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/obtener/${codigoNegocio}`);
  }/** */
  
  public eliminar(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.negociosURL}/eliminar/${codigoNegocio}`);
  }
  
  public listarNegociosPropietario(codigoCliente: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/listar-negocios/${codigoCliente}`);
  }

  public listarPorEstado(estado: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/listar-por-estado/${estado}`);
  }

  /*public buscar(palabra: string): ItemNegocioDTO[] {
    if (!palabra) {
      return [];
    }

    const palabraLowerCase = palabra.toLowerCase();
    return this.negocios.filter((negocio: { nombre: string; }) => negocio.nombre.toLowerCase().includes(palabraLowerCase));
    }/** */
}
