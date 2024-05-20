import { Injectable } from '@angular/core';
import { UbicacionDTO } from '../dto/ubicacion-dto';
import { ItemNegocioDTO } from '../dto/item-negocio-dto';
import { RegistroNegocioDTO } from '../dto/registro-negocio-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MensajeDTO } from '../dto/mensaje-dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  private negociosAPI = "http://localhost:8080/api/negociosAPI";

  negocios: ItemNegocioDTO[];
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.negocios = [];
  }
  public listarNegocios() {
    let params = new HttpParams().set('codigo', this.tokenService.getCodigo());
    return this.http.get<MensajeDTO>(`${this.negociosAPI}/mis-negocios`,{params});
  }
  public obtener(codigo: string): ItemNegocioDTO | undefined {
    return this.negocios.find(negocios => negocios.codigoNegocio == codigo);
  }

  public crear(negocioNuevo: RegistroNegocioDTO) {
    const codigo = (this.negocios.length + 1).toString();
    this.negocios.push( new ItemNegocioDTO(codigo, negocioNuevo.nombre,
    negocioNuevo.imagenes[0], negocioNuevo.tipoNegocio, negocioNuevo.ubicacion, 0, 'PENDIENTE') );
  }

  public eliminar(codigo: string) {
    this.negocios = this.negocios.filter(n => n.codigoNegocio !== codigo);
  }

  public buscar(palabra: string): ItemNegocioDTO[] {
    if (!palabra) {
      return [];
    }

    const palabraLowerCase = palabra.toLowerCase();
    return this.negocios.filter(negocio => negocio.nombre.toLowerCase().includes(palabraLowerCase));
  }
}
