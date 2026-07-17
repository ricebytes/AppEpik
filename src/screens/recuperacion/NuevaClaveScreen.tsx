import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TecladoPin } from '../../components/TecladoPin';
import { Watermark } from '../../components/Watermark';
import { useRecuperacionStore } from '../../state/recuperacionStore';
import { actualizarClaveUseCase } from '../../composition/recuperacionModule';

type Props = NativeStackScreenProps<RootStackParamList, 'NuevaClave'>;

const PIN_LENGTH = 4;

export function NuevaClaveScreen({ navigation }: Props) {
  const [clave, setClave] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [fase, setFase] = useState<'clave' | 'confirmar'>('clave');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tipoIdentificacion = useRecuperacionStore((s) => s.tipoIdentificacion);
  const numeroIdentificacion = useRecuperacionStore((s) => s.numeroIdentificacion);
  const tokenVerificacion = useRecuperacionStore((s) => s.tokenVerificacion);
  const reset = useRecuperacionStore((s) => s.reset);
  const insets = useSafeAreaInsets();

  async function handleTecla(tecla: string) {
    if (loading) return;

    if (fase === 'clave') {
      if (tecla === '⌫') { setClave((v) => v.slice(0, -1)); return; }
      if (clave.length >= PIN_LENGTH) return;
      const siguiente = clave + tecla;
      setClave(siguiente);
      if (siguiente.length === PIN_LENGTH) setFase('confirmar');
      return;
    }

    // fase confirmar
    if (tecla === '⌫') { setConfirmacion((v) => v.slice(0, -1)); return; }
    if (confirmacion.length >= PIN_LENGTH) return;
    const siguiente = confirmacion + tecla;
    setConfirmacion(siguiente);

    if (siguiente.length === PIN_LENGTH) {
      if (siguiente !== clave) {
        setError('Las claves no coinciden. Intenta de nuevo.');
        setClave('');
        setConfirmacion('');
        setFase('clave');
        return;
      }
      await guardar(siguiente);
    }
  }

  async function guardar(nuevaClave: string) {
    if (!tokenVerificacion) {
      setError('Sesión de recuperación expirada. Vuelve a empezar.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await actualizarClaveUseCase.execute(tipoIdentificacion, numeroIdentificacion, nuevaClave, tokenVerificacion);
      reset();
      navigation.reset({ index: 0, routes: [{ name: 'ExitoRecuperacion' }] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos actualizar la clave. Intenta de nuevo.');
      setClave('');
      setConfirmacion('');
      setFase('clave');
    } finally {
      setLoading(false);
    }
  }

  const pinActual = fase === 'clave' ? clave : confirmacion;
  const titulo = fase === 'clave' ? 'Crea tu nueva clave' : 'Confirma tu nueva clave';
  const subtitulo = fase === 'clave'
    ? 'Elige una clave de 4 dígitos para acceder a tu cuenta.'
    : 'Ingresa de nuevo los 4 dígitos para confirmar.';

  return (
    <View style={styles.container}>
      <Watermark />

      <ScreenHeader title="Nueva clave" onBack={fase === 'confirmar' ? () => { setConfirmacion(''); setFase('clave'); } : undefined} />

      <View style={[styles.body, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.subtitulo}>{subtitulo}</Text>

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        {loading ? (
          <ActivityIndicator color={colors.violeta} style={styles.spinner} />
        ) : (
          <TecladoPin pin={pinActual} longitud={PIN_LENGTH} onTecla={handleTecla} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  body: { flex: 1, padding: 20, alignItems: 'center' },
  titulo: { ...typography.subtitle, color: colors.moradoOscuro, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  subtitulo: { ...typography.body, color: '#666', marginBottom: 24, textAlign: 'center' },
  error: { ...typography.caption, color: colors.magenta, marginBottom: 16, textAlign: 'center' },
  spinner: { marginTop: 40 },
});
