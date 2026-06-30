import { buildNombreCompleto, buildIniciales } from '../src/utils/nombre';

const obj = { nombreCompleto: 'Harry Potter' };

describe('buildNombreCompleto', () => {
  it('retorna nombreCompleto tal cual', () => {
    expect(buildNombreCompleto(obj)).toBe('Harry Potter');
  });

  it('funciona con nombre completo de cuatro partes', () => {
    expect(buildNombreCompleto({ nombreCompleto: 'Harry James Potter Evans' })).toBe(
      'Harry James Potter Evans',
    );
  });
});

describe('buildIniciales', () => {
  it('toma la primera letra del primer y último token', () => {
    expect(buildIniciales(obj)).toBe('HP');
  });

  it('usa la misma letra cuando hay un solo token', () => {
    expect(buildIniciales({ nombreCompleto: 'Admin' })).toBe('AA');
  });
});
