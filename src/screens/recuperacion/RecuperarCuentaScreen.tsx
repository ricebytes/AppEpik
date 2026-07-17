import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Button } from '../../components/Button';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Watermark } from '../../components/Watermark';
import { SelectorTipoIdentificacion } from '../../components/SelectorTipoIdentificacion';
import { useRecuperacionStore } from '../../state/recuperacionStore';
import { enviarCodigoRecuperacionUseCase } from '../../composition/recuperacionModule';
import {
  CuentaNoEncontradaError,
  RecuperacionSinCorreoError,
} from '../../data/recuperacion/RecuperacionRepositoryImpl';
import {
  formatearIdentificacion,
  maxLengthIdentificacion,
  placeholderIdentificacion,
  validarFormatoIdentificacion,
} from '../../utils/validacion';

type Props = NativeStackScreenProps<RootStackParamList, 'RecuperarCuenta'>;

export function RecuperarCuentaScreen({ navigation }: Props) {
  const [tipoIdentificacion, setTipoIdentificacion] = useState<string>('CC');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setIdentificacion = useRecuperacionStore((s) => s.setIdentificacion);
  const setCorreoEnmascarado = useRecuperacionStore((s) => s.setCorreoEnmascarado);
  const insets = useSafeAreaInsets();

  const puedeEnviar = validarFormatoIdentificacion(numeroIdentificacion, tipoIdentificacion) && !loading;

  function handleChangeTipo(codigo: string) {
    setTipoIdentificacion(codigo);
    setNumeroIdentificacion('');
    setError('');
  }

  async function handleContinuar() {
    setLoading(true);
    setError('');

    try {
      const { correoEnmascarado } = await enviarCodigoRecuperacionUseCase.execute(
        tipoIdentificacion,
        numeroIdentificacion,
      );
      setIdentificacion(tipoIdentificacion, numeroIdentificacion);
      setCorreoEnmascarado(correoEnmascarado);
      navigation.navigate('VerificacionCorreoRecuperacion');
    } catch (err) {
      if (err instanceof CuentaNoEncontradaError) {
        setError(err.message);
      } else if (err instanceof RecuperacionSinCorreoError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('No pudimos procesar tu solicitud. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Watermark />

      <ScreenHeader title="Recuperar cuenta" onBack={() => navigation.goBack()} />

      <View style={[styles.body, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.descripcion}>
          Ingresa tu identificación para recuperar el acceso a tu cuenta. Te enviaremos un código al correo registrado.
        </Text>

        <Text style={styles.label}>Tipo de identificación</Text>
        <View style={styles.selectorWrapper}>
          <SelectorTipoIdentificacion value={tipoIdentificacion} onChange={handleChangeTipo} />
        </View>

        <Text style={styles.label}>Número de identificación</Text>
        <TextInput
          style={styles.input}
          value={numeroIdentificacion}
          onChangeText={(text) => {
            setError('');
            setNumeroIdentificacion(formatearIdentificacion(text, tipoIdentificacion));
          }}
          placeholder={placeholderIdentificacion(tipoIdentificacion)}
          keyboardType="default"
          autoCapitalize="characters"
          maxLength={maxLengthIdentificacion(tipoIdentificacion)}
        />

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        <View style={styles.spacer} />

        {loading ? (
          <ActivityIndicator color={colors.violeta} />
        ) : (
          <Button label="Continuar →" onPress={handleContinuar} disabled={!puedeEnviar} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  body: { flex: 1, padding: 20 },
  descripcion: { ...typography.body, color: colors.moradoOscuro, marginBottom: 24, lineHeight: 22 },
  label: { ...typography.caption, color: colors.moradoOscuro, fontWeight: '700', marginBottom: 6 },
  selectorWrapper: { marginBottom: 14 },
  input: {
    height: 44,
    borderWidth: 1.5,
    borderColor: colors.violeta,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: colors.moradoOscuro,
    marginBottom: 14,
  },
  error: { ...typography.caption, color: colors.magenta, marginTop: 4 },
  spacer: { flex: 1 },
});
