import { Role } from "./role"

export class Usuario {
    idUsuario: number = 0
    username: string = ''
    correo: string = ''
    password: string = ''
    universidad: string = ''
    presupuestoMensual: number = 0
    medioTransporte: string = ''
    cicloEstudio: string = ''
    estado: boolean = true
    fechaRegistro: Date = new Date()
    role: Role = new Role()
}