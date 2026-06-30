import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Button } from '../../components/Button';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Watermark } from '../../components/Watermark';
import { useEnrolamientoStore } from '../../state/enrolamientoStore';
import { buildIniciales } from '../../utils/nombre';
import { maskEmail, maskPhone } from '../../utils/mask';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmacionDatos'>;

export function ConfirmacionDatosScreen({ navigation }: Props) {
  const datosEnrolamiento = useEnrolamientoStore((state) => state.datosEnrolamiento);
  const numeroIdentificacion = useEnrolamientoStore((state) => state.numeroIdentificacion);
  const reset = useEnrolamientoStore((state) => state.reset);
  const insets = useSafeAreaInsets();

  if (!datosEnrolamiento) {
    navigation.replace('IngresoIdentificacion');
    return null;
  }

  function handleNoSonMisDatos() {
    reset();
    navigation.replace('IngresoIdentificacion');
  }

  return (
    <View style={styles.container}>
      <Watermark />

      <ScreenHeader title="Confirma tus datos" onBack={() => navigation.goBack()} />

      <View style={[styles.body, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.identityRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLabel}>{buildIniciales(datosEnrolamiento)}</Text>
          </View>
          <View>
            <Text style={styles.nombre}>{datosEnrolamiento.nombreCompleto}</Text>
            <Text style={styles.identificacion}>{numeroIdentificacion}</Text>
          </View>
        </View>

        <View style={styles.detalle}>
          <View style={styles.detalleRow}>
            <Text style={styles.detalleLabel}>Teléfono</Text>
            <Text style={styles.detalleValor}>{maskPhone(datosEnrolamiento.telefono)}</Text>
          </View>
          <View style={[styles.detalleRow, styles.detalleRowBorder]}>
            <Text style={styles.detalleLabel}>Correo</Text>
            <Text style={styles.detalleValor}>{maskEmail(datosEnrolamiento.correo)}</Text>
          </View>
        </View>

        <View style={styles.spacer} />

        <Button label="Sí, son correctos" onPress={() => navigation.navigate('CrearClave')} />
        <View style={styles.buttonGap} />
        <Button label="No son mis datos" variant="secondary" onPress={handleNoSonMisDatos} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blanco,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEEDFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    ...typography.body,
    color: '#26215C',
    fontWeight: '700',
  },
  nombre: {
    ...typography.body,
    color: colors.moradoOscuro,
    fontWeight: '700',
  },
  identificacion: {
    ...typography.caption,
    color: '#888780',
  },
  detalle: {
    borderTopWidth: 1,
    borderTopColor: colors.grisClaro,
    paddingTop: 10,
  },
  detalleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  detalleRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F1EFE8',
  },
  detalleLabel: {
    ...typography.caption,
    color: '#888780',
  },
  detalleValor: {
    ...typography.caption,
    color: colors.moradoOscuro,
  },
  spacer: {
    flex: 1,
  },
  buttonGap: {
    height: 8,
  },
});
