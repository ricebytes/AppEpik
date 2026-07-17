export interface RecuperacionRepository {
  enviarCodigo(tipoIdentificacion: string, identificacion: string): Promise<{ correoEnmascarado: string }>;
  verificarCodigo(tipoIdentificacion: string, identificacion: string, codigo: string): Promise<{ tokenVerificacion: string }>;
  actualizarClave(tipoIdentificacion: string, identificacion: string, clave: string, tokenVerificacion: string): Promise<void>;
}
