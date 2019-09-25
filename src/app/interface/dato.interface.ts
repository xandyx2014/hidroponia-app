export interface RespDato {
  ok: boolean;
  data: Dato;
}

export interface Dato {
  id: number;
  temperatura: string;
  ph: string;
  fecha: string;
  solucion: string;
  luz: string;
  id_modulo: number;
  createdAt: string;
  updatedAt: string;
}