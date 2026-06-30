import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { useSesionStore } from '../../state/sesionStore';
import { Watermark } from '../../components/Watermark';

type Props = NativeStackScreenProps<RootStackParamList, 'ValidandoLogin'>;

export function ValidandoLoginScreen({ navigation }: Props) {
  const estado = useSesionStore((state) => state.estado);

  useEffect(() => {
    if (estado === 'autenticado') {
      navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
    } else if (estado === 'error') {
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  }, [estado, navigation]);

  return (
    <View style={styles.container}>
      <Watermark />

      <ActivityIndicator size="large" color={colors.amarillo} style={styles.spinner} />
      <Text style={styles.titulo}>Validando tus datos...</Text>
      <Text style={styles.subtitulo}>Esto toma solo unos segundos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blanco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginBottom: 18,
  },
  titulo: {
    ...typography.body,
    color: colors.moradoOscuro,
    fontWeight: '700',
  },
  subtitulo: {
    ...typography.caption,
    color: '#888780',
    marginTop: 4,
  },
});
