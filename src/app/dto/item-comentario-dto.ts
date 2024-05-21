export class ItemComentarioDTO {

    constructor(
        
        public codigoComentario: string = '',
        public mensaje: string= '',
        public respuesta: string= '',
        public nombreCliente: string= '',
        public fotoCliente: string= '',
        public fechaFormato: Date= new Date(),
        public calificacion: number = 0,
        
    )
    {}
}
