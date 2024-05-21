import { UbicacionDTO } from "./ubicacion-dto";
import { ItemComentarioDTO } from "./item-comentario-dto";

export class DetalleNegocioDTO {
    
    constructor(
        public codigoNegocio: string = '',
        public nombre: string = '',
        public imagenDestacada: string = '',
        public tipoNegocio: string = '',
        public ubicacion: UbicacionDTO = new UbicacionDTO(0,0),
        public calificacionPromedio: number = 0,
        public estadoNegocio:string = '',
        public comentarios: ItemComentarioDTO[] = []
        
    )
    {}
}
