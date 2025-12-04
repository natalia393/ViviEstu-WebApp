import { Usuario } from "./usuario"
import { Zona } from "./zona"

export class Valoracion {
    idValoracion: number = 0
    puntajeSeguridad: number = 0
    puntajeAcceso: number = 0
    puntajeServicios: number = 0
    comentario: string = ''
    fecha: Date = new Date()
    usuario: Usuario = new Usuario()
    zona: Zona = new Zona()
}