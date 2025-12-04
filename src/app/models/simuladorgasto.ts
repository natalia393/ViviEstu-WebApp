import { Usuario } from "./usuario"
import { Zona } from "./zona"

export class Simuladorgasto {
    idSimulador: number = 0
    costoAlquiler: number = 0
    costoTransporte: number = 0
    costoTotalEstimado: number = 0
    fechaSimulacion: Date = new Date()
    usuario: Usuario = new Usuario()
    zona: Zona = new Zona()
}