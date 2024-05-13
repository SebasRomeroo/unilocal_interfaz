import { UbicacionDTO } from "./ubicacion-dto";

export class RegistroNegocioDTO {
    constructor(
        public nombre: string='' ,
        public tipoNegocio: string='' ,
        public longitud: number ,
        public ubicacion: UbicacionDTO = new UbicacionDTO(0,0),
        public imagenes: string[] = []
    ){}    
}
