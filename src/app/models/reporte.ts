import { Usuario } from "./usuario"

export class Reporte {
    idReporte: number = 0
    titulo: string = ''
    contenidoJson: string = ''
    fechaGenerado: Date = new Date()
    usuario: Usuario = new Usuario()
}