import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Button } from '../../components/Button';
import { Watermark } from '../../components/Watermark';
import { useSesionStore } from '../../state/sesionStore';
import { buildIniciales } from '../../utils/nombre';
import { formatMonto } from '../../utils/moneda';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  const cliente = useSesionStore((state) => state.cliente);
  const logout = useSesionStore((state) => state.logout);
  const insets = useSafeAreaInsets();

  if (!cliente) {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    return null;
  }

  const enMora = cliente.estadoCredito.toLowerCase().includes('mora');

  function handleCerrarSesion() {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  return (
    <View style={styles.container}>
      <Watermark />

      <View style={styles.header}>
        <View style={styles.identityRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLabel}>{buildIniciales(cliente)}</Text>
          </View>
          <View>
            <Text style={styles.greeting}>¡Hola!</Text>
            <Text style={styles.nombre}>{cliente.nombreCompleto}</Text>
            {enMora && (
              <Text style={styles.badge}>EN MORA: {formatMonto(cliente.cuotaEnMora)}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={[styles.body, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.cupoCard}>
          <Text style={styles.cupoLabel}>Cupo disponible</Text>
          <Text style={styles.cupoMonto}>{formatMonto(cliente.cupoDisponible)}</Text>
          <View style={styles.cupoDetalle}>
            <View>
              <Text style={styles.cupoDetalleLabel}>Cupo aprobado</Text>
              <Text style={styles.cupoDetalleValor}>{formatMonto(cliente.cupoAprobado)}</Text>
            </View>
            <View>
              <Text style={styles.cupoDetalleLabel}>Efectivo disp.</Text>
              <Text style={styles.cupoDetalleValor}>{formatMonto(cliente.cupoDisponibleEfectivo)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detalle}>
          <View style={styles.detalleRow}>
            <Text style={styles.detalleLabel}>Cuota actual</Text>
            <Text style={styles.detalleValor}>{formatMonto(cliente.cuotaCredito)}</Text>
          </View>
          <View style={[styles.detalleRow, styles.detalleRowBorder]}>
            <Text style={styles.detalleLabel}>Pago total crédito</Text>
            <Text style={styles.detalleValor}>{formatMonto(cliente.pagoTotalCredito)}</Text>
          </View>
          <View style={[styles.detalleRow, styles.detalleRowBorder]}>
            <Text style={styles.detalleLabel}>Plazo</Text>
            <Text style={styles.detalleValor}>{cliente.plazo} cuotas</Text>
          </View>
          <View style={[styles.detalleRow, styles.detalleRowBorder]}>
            <Text style={styles.detalleLabel}>Pago mínimo</Text>
            <Text style={styles.detalleValor}>{formatMonto(cliente.pagoMinimo)}</Text>
          </View>
        </View>

        <View style={styles.spacer} />

        <View style={styles.botonesRow}>
          <View style={styles.botonFlex}>
            <Button label="Pide tú →" onPress={() => {}} />
          </View>
          <View style={styles.botonFlex}>
            <Button label="Cerrar sesión" variant="tertiary" onPress={handleCerrarSesion} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FB',
  },
  header: {
    backgroundColor: colors.moradoOscuro,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  badge: {
    ...typography.caption,
    color: colors.blanco,
    backgroundColor: colors.magenta,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 6,
    fontWeight: '700',
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.amarillo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    ...typography.body,
    color: colors.moradoOscuro,
    fontWeight: '700',
  },
  greeting: {
    ...typography.caption,
    color: colors.grisClaro,
  },
  nombre: {
    ...typography.body,
    color: colors.blanco,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  cupoCard: {
    backgroundColor: colors.moradoOscuro,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  cupoLabel: {
    ...typography.caption,
    color: colors.grisClaro,
  },
  cupoMonto: {
    ...typography.title,
    color: colors.amarillo,
  },
  cupoDetalle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cupoDetalleLabel: {
    ...typography.caption,
    color: '#A8A4C0',
  },
  cupoDetalleValor: {
    ...typography.body,
    color: colors.blanco,
    fontWeight: '700',
  },
  detalle: {
    borderWidth: 1.5,
    borderColor: colors.grisClaro,
    borderRadius: 12,
    padding: 14,
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
    ...typography.body,
    color: colors.moradoOscuro,
    fontWeight: '700',
  },
  spacer: {
    flex: 1,
  },
  botonesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  botonFlex: {
    flex: 1,
  },
});
