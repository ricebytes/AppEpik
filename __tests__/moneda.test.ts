import { formatMonto } from '../src/utils/moneda';

describe('formatMonto', () => {
  it('formatea enteros con dos decimales y separador de miles', () => {
    expect(formatMonto(1000)).toBe('$1,000.00');
  });

  it('formatea decimales conservando dos cifras', () => {
    expect(formatMonto(118.72)).toBe('$118.72');
  });

  it('formatea cero', () => {
    expect(formatMonto(0)).toBe('$0.00');
  });

  it('formatea miles grandes con decimales', () => {
    expect(formatMonto(2762.34)).toBe('$2,762.34');
  });
});
