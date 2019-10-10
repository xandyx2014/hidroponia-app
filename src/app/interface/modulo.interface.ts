import { Dato } from './dato.interface';
export interface RespuestaModuloFecha {
  ok: boolean;
  data: Modulo;
}
export interface Modulo {
  id: number;
  nombre: string;
  modelo: string;
  detalle: string;
  id_hidroponia: number;
  createdAt: string;
  updatedAt: string;
  Datos?: Dato[];
}


