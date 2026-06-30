import { Cliente } from '../cliente/Cliente';

export interface AutenticacionRepository {
  autenticar(tipoIdentificacion: string, identificacion: string, clave: string): Promise<Cliente>;
}
