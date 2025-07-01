import { User } from "./user";

export class Character {
    id: number = -1;
    nombre: string = "";
    banda: string = "";
    rol: string = "";
    personalidad: string = "";
    descripcion: string = "";
    imagen: string = "";
    user?: User | null;
}