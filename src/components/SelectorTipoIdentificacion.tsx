import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { TIPOS_IDENTIFICACION } from '../domain/cliente/TipoIdentificacion';

interface SelectorTipoIdentificacionProps {
  value: number | null;
  onChange: (codigo: number) => void;
}

export function SelectorTipoIdentificacion({ value, onChange }: SelectorTipoIdentificacionProps) {
  const [abierto, setAbierto] = useState(false);
  const insets = useSafeAreaInsets();
  const seleccionado = TIPOS_IDENTIFICACION.find((tipo) => tipo.codigo === value);

  function handleSeleccionar(codigo: number) {
    onChange(codigo);
    setAbierto(false);
  }

  return (
    <>
      <Pressable
        style={[styles.field, value !== null && styles.fieldActive]}
        onPress={() => setAbierto(true)}
      >
        <Text style={styles.fieldText}>{seleccionado ? seleccionado.etiqueta : 'Cédula de ciudadanía'}</Text>
        <Text style={styles.arrow}>▾</Text>
      </Pressable>

      <Modal visible={abierto} transparent animationType="fade" onRequestClose={() => setAbierto(false)}>
        <Pressable style={styles.overlay} onPress={() => setAbierto(false)}>
          <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
            {TIPOS_IDENTIFICACION.map((tipo) => (
              <Pressable
                key={tipo.codigo}
                style={styles.opcion}
                onPress={() => handleSeleccionar(tipo.codigo)}
              >
                <Text style={styles.opcionTexto}>{tipo.etiqueta}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    height: 44,
    borderWidth: 1.5,
    borderColor: colors.grisClaro,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldActive: {
    borderColor: colors.violeta,
  },
  fieldText: {
    ...typography.body,
    color: colors.moradoOscuro,
  },
  arrow: {
    ...typography.body,
    color: colors.violeta,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.blanco,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 8,
  },
  opcion: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  opcionTexto: {
    ...typography.body,
    color: colors.moradoOscuro,
  },
});
