import { UbicacionDTO } from "./ubicacion-dto";
import { ItemComentarioDTO } from "./item-comentario-dto";

export class ItemNegocioDTO {
    constructor(
    public codigo: string = '',
    public nombre: string = '',
    public fotoPerfil: string = '',
    public tipoNegocio: string = '',
    public estadoNegocio:string = ''
    ){}
}
