import { DatosEnrolamiento } from './DatosEnrolamiento';

export interface EnrolamientoRepository {
  consultar(tipoIdentificacion: string, identificacion: string): Promise<DatosEnrolamiento>;
  enviarCodigo(tipoIdentificacion: string, identificacion: string): Promise<{ correoEnmascarado: string }>;
  verificarCodigo(tipoIdentificacion: string, identificacion: string, codigo: string): Promise<{ tokenVerificacion: string }>;
  confirmar(tipoIdentificacion: string, identificacion: string, clave: string, tokenVerificacion: string): Promise<void>;
}
