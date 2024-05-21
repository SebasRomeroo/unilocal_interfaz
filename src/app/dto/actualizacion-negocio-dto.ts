import { HorarioDTO } from "./horario-dto";

export class ActualizacionNegocioDTO {

    constructor(
        public codigo: string='' ,
        public nombre: string='' ,
        public descripcion: string='' ,
        public horarios: HorarioDTO[] = [] ,
        public imagenes: String[] = [] ,
        public telefonos: string[] = [],
    ){} 
}
