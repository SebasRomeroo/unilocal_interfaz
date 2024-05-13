import { UbicacionDTO } from "./ubicacion-dto";

export class ItemNegocioDTO {
    constructor(
    public codigoNegocio: string = '',
    public nombre: string = '',
    public imagenDestacada: string = '',
    public tipoNegocio: string = '',
    public ubicacion: UbicacionDTO = new UbicacionDTO(0,0),
    public calificacionPromedio: number = 0,
    public estadoNegocio:string = ''
    ){}
}
