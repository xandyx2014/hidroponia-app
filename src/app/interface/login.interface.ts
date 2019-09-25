export interface RespLogin {
  ok: boolean;
  data: Usuario;
  token: string;
  message?: string;
}

export interface Usuario {
  id: number;
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  createdAt: string;
  token?: string;
  updatedAt: string;
}
