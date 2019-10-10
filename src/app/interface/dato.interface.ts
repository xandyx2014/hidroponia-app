export interface RespDato {
  ok: boolean;
  data: Dato;
}

export interface Dato {
  id?: number;
  temperatura?: string | number;
  ph?: string | number;
  fecha?: string;
  solucion?: string | number;
  luz?: string | number;
  id_modulo?: number;
  createdAt?: string;
  updatedAt?: string;
}
