import { UbicacionDTO } from "./ubicacion-dto";

export class ItemNegocioDTO {
    constructor(
    public codigo: string = '',
    public nombre: string = '',
    public fotoPerfil: string = '',
    public tipoNegocio: string = '',
    public estadoNegocio:string = '',
    public ubicacion: UbicacionDTO = new UbicacionDTO(0,0),
    
    ){}
}
