import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Button } from '../../components/Button';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Watermark } from '../../components/Watermark';
import { useEnrolamientoStore } from '../../state/enrolamientoStore';
import { enviarCodigoUseCase } from '../../composition/enrolamientoModule';
import { EnrolamientoSinCorreoError } from '../../data/enrolamiento/EnrolamientoRepositoryImpl';

type Props = NativeStackScreenProps<RootStackParamList, 'VerificacionCorreo'>;

export function VerificacionCorreoScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sinCorreo, setSinCorreo] = useState(false);

  const tipoIdentificacion = useEnrolamientoStore((state) => state.tipoIdentificacion);
  const numeroIdentificacion = useEnrolamientoStore((state) => state.numeroIdentificacion);
  const datosEnrolamiento = useEnrolamientoStore((state) => state.datosEnrolamiento);
  const setCorreoEnmascarado = useEnrolamientoStore((state) => state.setCorreoEnmascarado);
  const insets = useSafeAreaInsets();

  const correoMostrado = datosEnrolamiento?.correo ?? '';

  async function handleEnviarCodigo() {
    if (!tipoIdentificacion || !numeroIdentificacion) {
      setError('Error interno. Vuelve al inicio.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { correoEnmascarado } = await enviarCodigoUseCase.execute(tipoIdentificacion, numeroIdentificacion);
      setCorreoEnmascarado(correoEnmascarado);
      navigation.navigate('IngresarOtp');
    } catch (err) {
      if (err instanceof EnrolamientoSinCorreoError) {
        setSinCorreo(true);
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('No pudimos enviar el código. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Watermark />

      <ScreenHeader title="Verificación de correo" onBack={() => navigation.goBack()} />

      <View style={[styles.body, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.descripcion}>
          Para confirmar tu identidad, enviaremos un código de verificación al correo que tenemos registrado:
        </Text>

        {correoMostrado.length > 0 && <Text style={styles.correo}>{correoMostrado}</Text>}

        <Text style={styles.nota}>
          El código tiene una validez de 10 minutos. Revisa también tu carpeta de spam.
        </Text>

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        <View style={styles.spacer} />

        {loading ? (
          <ActivityIndicator color={colors.violeta} style={styles.spinner} />
        ) : (
          <Button label="Enviar código" onPress={handleEnviarCodigo} disabled={sinCorreo} />
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
  },
  descripcion: {
    ...typography.body,
    color: colors.moradoOscuro,
    marginBottom: 16,
  },
  correo: {
    ...typography.subtitle,
    color: colors.violeta,
    marginBottom: 20,
  },
  nota: {
    ...typography.caption,
    color: '#888780',
  },
  error: {
    ...typography.caption,
    color: colors.magenta,
    marginTop: 16,
  },
  spacer: {
    flex: 1,
  },
  spinner: {
    marginBottom: 4,
  },
});
