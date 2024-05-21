export class CrearComentarioDTO {

    constructor(
        
        public fecha: Date = new Date(),
        public calificacion: number = 0,
        public codigoCliente: string = '',
        public codigoNegocio: string = '',
        public mensaje: string= ''
        
    )
    {}
}
