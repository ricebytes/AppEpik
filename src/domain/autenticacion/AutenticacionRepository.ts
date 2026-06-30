import { Cliente } from '../cliente/Cliente';

export interface AutenticacionRepository {
  autenticar(
    numeroIdentificacion: string,
    tipoIdentificacion: number,
    clave: string,
  ): Promise<Cliente>;
}
