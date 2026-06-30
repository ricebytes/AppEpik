import { DatosEnrolamiento } from './DatosEnrolamiento';

export interface EnrolamientoRepository {
  consultar(tipoIdentificacion: string, identificacion: string): Promise<DatosEnrolamiento>;
  confirmar(tipoIdentificacion: string, identificacion: string, clave: string): Promise<void>;
}
