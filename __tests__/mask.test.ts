import { maskEmail, maskPhone } from '../src/utils/mask';

describe('maskEmail', () => {
  it('muestra los primeros 3 caracteres y enmascara el resto, incluyendo el dominio', () => {
    expect(maskEmail('jramos@gattaca.co')).toBe('jra' + '*'.repeat(14));
  });

  it('devuelve el valor completo si tiene 3 caracteres o menos', () => {
    expect(maskEmail('jr')).toBe('jr');
  });
});

describe('maskPhone', () => {
  it('muestra los primeros 6 caracteres y enmascara el resto', () => {
    expect(maskPhone('573058774458')).toBe('573058******');
  });

  it('devuelve el valor completo si tiene 6 caracteres o menos', () => {
    expect(maskPhone('12345')).toBe('12345');
  });
});
