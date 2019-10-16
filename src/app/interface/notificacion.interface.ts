export interface RespNotificacion {
  ok: boolean;
  data: Notificacion[];
}

export interface Notificacion {
  id: number;
  nombre: string;
  descripcion: string;
  id_modulo: number;
  tipo: string;
  createdAt: string;
  updatedAt: string;
}
