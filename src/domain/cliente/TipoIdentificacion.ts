export type CodigoTipoIdentificacion = 'CC' | 'PASAPORTE';

export interface TipoIdentificacion {
  codigo: CodigoTipoIdentificacion;
  etiqueta: string;
}

export const TIPOS_IDENTIFICACION: TipoIdentificacion[] = [
  { codigo: 'CC', etiqueta: 'Cédula de ciudadanía' },
  { codigo: 'PASAPORTE', etiqueta: 'Pasaporte' },
];
