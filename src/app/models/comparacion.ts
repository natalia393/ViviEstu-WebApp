import { Comparaciondetalle } from "./comparaciondetalle";
import { Usuario } from "./usuario"

export class Comparacion {
    idComparacion: number = 0
    fecha: Date = new Date()
    usuario: Usuario = new Usuario()
    detalles: Comparaciondetalle[] = [];
}