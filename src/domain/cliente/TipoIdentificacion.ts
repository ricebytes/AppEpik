export interface TipoIdentificacion {
  codigo: number;
  etiqueta: string;
}

export const TIPOS_IDENTIFICACION: TipoIdentificacion[] = [
  { codigo: 1, etiqueta: 'Cédula de ciudadanía' },
  { codigo: 2, etiqueta: 'Pasaporte' },
];
