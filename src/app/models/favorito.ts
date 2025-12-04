import { Usuario } from "./usuario"
import { Zona } from "./zona"

export class Favorito {
    idFavorito: number = 0
    usuario: Usuario = new Usuario()
    zona: Zona = new Zona()
}