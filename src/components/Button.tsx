import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
}

const VARIANT_STYLES = {
  primary: { container: 'primary', label: 'labelPrimary' },
  secondary: { container: 'secondary', label: 'labelSecondary' },
  tertiary: { container: 'tertiary', label: 'labelTertiary' },
} as const;

export function Button({ label, onPress, variant = 'primary', disabled }: ButtonProps) {
  const { container, label: labelStyleKey } = VARIANT_STYLES[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.base, styles[container], disabled && styles.disabled]}
    >
      <Text style={[styles.label, styles[labelStyleKey]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.amarillo,
  },
  secondary: {
    backgroundColor: colors.blanco,
    borderWidth: 1.5,
    borderColor: colors.moradoOscuro,
  },
  tertiary: {
    backgroundColor: colors.blanco,
    borderWidth: 1.5,
    borderColor: colors.amarillo,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.button,
  },
  labelPrimary: {
    color: colors.moradoOscuro,
  },
  labelSecondary: {
    color: colors.moradoOscuro,
  },
  labelTertiary: {
    color: colors.amarillo,
  },
});
