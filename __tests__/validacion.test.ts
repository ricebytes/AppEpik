import {
  formatearCedula,
  formatearPasaporte,
  formatearIdentificacion,
  validarFormatoIdentificacion,
  placeholderIdentificacion,
  maxLengthIdentificacion,
} from '../src/utils/validacion';

describe('formatearPasaporte', () => {
  it('convierte a mayúsculas y elimina caracteres no alfanuméricos', () => {
    expect(formatearPasaporte('a1-b2 c3!')).toBe('A1B2C3');
  });

  it('acepta números al inicio', () => {
    expect(formatearPasaporte('123456789')).toBe('123456789');
  });

  it('acepta letras al inicio', () => {
    expect(formatearPasaporte('AB123456')).toBe('AB123456');
  });

  it('trunca a 20 caracteres', () => {
    expect(formatearPasaporte('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toHaveLength(20);
  });

  it('elimina guiones (no permitidos en pasaporte)', () => {
    expect(formatearPasaporte('A-1234')).toBe('A1234');
  });
});

describe('formatearCedula', () => {
  it('acepta letras, dígitos y guiones', () => {
    expect(formatearCedula('8-456-7890')).toBe('8-456-7890');
  });

  it('elimina espacios y caracteres especiales', () => {
    expect(formatearCedula('8 456 7890!')).toBe('84567890');
  });

  it('convierte a mayúsculas', () => {
    expect(formatearCedula('pe-12-3456')).toBe('PE-12-3456');
  });

  it('trunca a 20 caracteres', () => {
    expect(formatearCedula('1234567890123456789012345')).toHaveLength(20);
  });
});

describe('formatearIdentificacion', () => {
  it('usa formatearPasaporte cuando tipo es PASAPORTE', () => {
    expect(formatearIdentificacion('a1-b2', 'PASAPORTE')).toBe('A1B2');
  });

  it('usa formatearCedula para CC', () => {
    expect(formatearIdentificacion('8-456-7890', 'CC')).toBe('8-456-7890');
  });

  it('usa formatearCedula cuando tipo es null', () => {
    expect(formatearIdentificacion('abc!', null)).toBe('ABC');
  });
});

describe('validarFormatoIdentificacion — PASAPORTE', () => {
  it('es válido con letras y números de al menos 5 chars', () => {
    expect(validarFormatoIdentificacion('A12345', 'PASAPORTE')).toBe(true);
  });

  it('es válido cuando empieza con números', () => {
    expect(validarFormatoIdentificacion('123456', 'PASAPORTE')).toBe(true);
  });

  it('es válido con exactamente 5 chars', () => {
    expect(validarFormatoIdentificacion('AB123', 'PASAPORTE')).toBe(true);
  });

  it('es inválido con menos de 5 caracteres', () => {
    expect(validarFormatoIdentificacion('AB12', 'PASAPORTE')).toBe(false);
  });

  it('es inválido si contiene guiones', () => {
    expect(validarFormatoIdentificacion('A1-345', 'PASAPORTE')).toBe(false);
  });

  it('es inválido cuando está vacío', () => {
    expect(validarFormatoIdentificacion('', 'PASAPORTE')).toBe(false);
  });
});

describe('validarFormatoIdentificacion — CC', () => {
  it('es válido con al menos 3 caracteres alfanuméricos', () => {
    expect(validarFormatoIdentificacion('123', 'CC')).toBe(true);
  });

  it('es válido con guiones', () => {
    expect(validarFormatoIdentificacion('8-456-7890', 'CC')).toBe(true);
  });

  it('es inválido con menos de 3 caracteres', () => {
    expect(validarFormatoIdentificacion('12', 'CC')).toBe(false);
  });

  it('es inválido cuando tipo es null', () => {
    expect(validarFormatoIdentificacion('123456', null)).toBe(false);
  });

  it('es inválido cuando está vacío', () => {
    expect(validarFormatoIdentificacion('', 'CC')).toBe(false);
  });
});

describe('placeholderIdentificacion', () => {
  it('retorna placeholder de pasaporte', () => {
    expect(placeholderIdentificacion('PASAPORTE')).toBe('Ej: A12345678 o 123456789');
  });

  it('retorna placeholder de cédula para CC', () => {
    expect(placeholderIdentificacion('CC')).toBe('Ej: 8-456-7890 o PE-12-3456');
  });

  it('retorna placeholder de cédula para null', () => {
    expect(placeholderIdentificacion(null)).toBe('Ej: 8-456-7890 o PE-12-3456');
  });
});

describe('maxLengthIdentificacion', () => {
  it('retorna 20 para pasaporte', () => {
    expect(maxLengthIdentificacion('PASAPORTE')).toBe(20);
  });

  it('retorna 20 para cédula', () => {
    expect(maxLengthIdentificacion('CC')).toBe(20);
  });

  it('retorna 20 para null', () => {
    expect(maxLengthIdentificacion(null)).toBe(20);
  });
});
