import { UbicacionDTO } from "./ubicacion-dto";
import { HorarioDTO } from "./horario-dto";

export class RegistroNegocioDTO {
    constructor(
        public nombre: string='' ,
        public descripcion: string='' ,
        public codigoCliente: string='' ,
        public ubicacion: UbicacionDTO = new UbicacionDTO(0,0),
        public fotoPerfil: string = '',
        public imagenes: string[] = [],
        public tipoNegocio: string='' ,
        public horarios: HorarioDTO[] = [] ,
        public telefonos: string[] = [],
    ){}    
}
