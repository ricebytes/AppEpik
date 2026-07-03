import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TecladoPin } from '../../components/TecladoPin';
import { Watermark } from '../../components/Watermark';
import { useEnrolamientoStore } from '../../state/enrolamientoStore';
import { enviarCodigoUseCase, verificarCodigoUseCase } from '../../composition/enrolamientoModule';
import { CodigoAgotadoError, CodigoExpiradoError, CodigoIncorrectoError } from '../../data/enrolamiento/EnrolamientoRepositoryImpl';

type Props = NativeStackScreenProps<RootStackParamList, 'IngresarOtp'>;

const OTP_LENGTH = 6;

export function IngresarOtpScreen({ navigation }: Props) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [puedeReenviar, setPuedeReenviar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reenviando, setReenviando] = useState(false);

  const tipoIdentificacion = useEnrolamientoStore((state) => state.tipoIdentificacion);
  const numeroIdentificacion = useEnrolamientoStore((state) => state.numeroIdentificacion);
  const correoEnmascarado = useEnrolamientoStore((state) => state.correoEnmascarado);
  const setTokenVerificacion = useEnrolamientoStore((state) => state.setTokenVerificacion);
  const setCorreoEnmascarado = useEnrolamientoStore((state) => state.setCorreoEnmascarado);
  const insets = useSafeAreaInsets();

  async function handleTecla(tecla: string) {
    if (loading || reenviando) return;

    if (tecla === '⌫') {
      setOtp((actual) => actual.slice(0, -1));
      return;
    }

    if (otp.length >= OTP_LENGTH) return;

    const siguiente = otp + tecla;
    setOtp(siguiente);

    if (siguiente.length === OTP_LENGTH) {
      await verificar(siguiente);
    }
  }

  async function verificar(codigo: string) {
    if (!tipoIdentificacion || !numeroIdentificacion) {
      setError('Error interno. Vuelve al inicio.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { tokenVerificacion } = await verificarCodigoUseCase.execute(
        tipoIdentificacion,
        numeroIdentificacion,
        codigo,
      );
      setTokenVerificacion(tokenVerificacion);
      navigation.navigate('CrearClave');
    } catch (err) {
      if (err instanceof CodigoIncorrectoError) {
        setError(err.message);
        setOtp('');
      } else if (err instanceof CodigoAgotadoError || err instanceof CodigoExpiradoError) {
        setError(err.message);
        setOtp('');
        setPuedeReenviar(true);
      } else if (err instanceof Error) {
        setError(err.message);
        setOtp('');
      } else {
        setError('No pudimos verificar el código. Intenta de nuevo.');
        setOtp('');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleReenviar() {
    if (!tipoIdentificacion || !numeroIdentificacion) return;

    setReenviando(true);
    setError('');
    setOtp('');
    setPuedeReenviar(false);

    try {
      const { correoEnmascarado: correoNuevo } = await enviarCodigoUseCase.execute(
        tipoIdentificacion,
        numeroIdentificacion,
      );
      setCorreoEnmascarado(correoNuevo);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('No pudimos reenviar el código. Intenta de nuevo.');
      }
    } finally {
      setReenviando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Watermark />

      <ScreenHeader title="Ingresa el código" onBack={() => navigation.goBack()} />

      <View style={[styles.body, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.descripcion}>
          Ingresa el código de 6 dígitos que enviamos a{'\n'}
          <Text style={styles.correo}>{correoEnmascarado}</Text>
        </Text>

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        {loading || reenviando ? (
          <ActivityIndicator color={colors.violeta} style={styles.spinner} />
        ) : (
          <TecladoPin pin={otp} longitud={OTP_LENGTH} onTecla={handleTecla} />
        )}

        {puedeReenviar && !reenviando && (
          <Pressable onPress={handleReenviar} style={styles.reenviarBtn}>
            <Text style={styles.reenviarTexto}>Reenviar código</Text>
          </Pressable>
        )}
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
    alignItems: 'center',
  },
  descripcion: {
    ...typography.body,
    color: colors.moradoOscuro,
    textAlign: 'center',
    marginBottom: 16,
  },
  correo: {
    color: colors.violeta,
    fontWeight: '700',
  },
  error: {
    ...typography.caption,
    color: colors.magenta,
    marginBottom: 12,
    textAlign: 'center',
  },
  spinner: {
    marginTop: 40,
  },
  reenviarBtn: {
    marginTop: 24,
    paddingVertical: 10,
  },
  reenviarTexto: {
    ...typography.body,
    color: colors.violeta,
    textDecorationLine: 'underline',
  },
});
