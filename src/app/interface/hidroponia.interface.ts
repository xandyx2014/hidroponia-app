import { Modulo } from './modulo.interface';

export interface RespHidroponia {
  ok: boolean;
  data: Hidroponia[];
}

export interface Hidroponia {
  id?: number;
  zona?: string;
  calle?: string;
  longitud?: string;
  latitud?: string;
  id_usuario?: number;
  createdAt?: string;
  updatedAt?: string;
  Modulos?: Modulo[];
}
