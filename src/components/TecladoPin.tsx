import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const TECLADO = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

interface TecladoPinProps {
  pin: string;
  longitud: number;
  onTecla: (tecla: string) => void;
}

export function TecladoPin({ pin, longitud, onTecla }: TecladoPinProps) {
  return (
    <>
      <View style={styles.dots}>
        {Array.from({ length: longitud }).map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index < pin.length ? styles.dotFilled : styles.dotEmpty]}
          />
        ))}
      </View>

      <View style={styles.teclado}>
        {TECLADO.map((tecla, index) => (
          <Pressable
            key={`${tecla}-${index}`}
            style={[styles.tecla, tecla === '' && styles.teclaInvisible]}
            onPress={() => onTecla(tecla)}
            disabled={tecla === ''}
          >
            <Text style={tecla === '⌫' ? styles.teclaBorrar : styles.teclaTexto}>{tecla}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  dotFilled: {
    backgroundColor: colors.amarillo,
  },
  dotEmpty: {
    backgroundColor: colors.grisClaro,
  },
  teclado: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    gap: 10,
  },
  tecla: {
    width: '30%',
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.grisClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teclaInvisible: {
    backgroundColor: 'transparent',
  },
  teclaTexto: {
    ...typography.subtitle,
    color: colors.moradoOscuro,
  },
  teclaBorrar: {
    ...typography.body,
    color: colors.magenta,
  },
});
