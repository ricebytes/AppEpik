import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Button } from '../../components/Button';
import { SelectorTipoIdentificacion } from '../../components/SelectorTipoIdentificacion';
import { Watermark } from '../../components/Watermark';
import { consultarParaEnrolamientoUseCase } from '../../composition/enrolamientoModule';
import { useEnrolamientoStore } from '../../state/enrolamientoStore';
import { EnrolamientoDuplicadoError } from '../../data/enrolamiento/EnrolamientoRepositoryImpl';
import {
  formatearIdentificacion,
  maxLengthIdentificacion,
  placeholderIdentificacion,
  validarFormatoIdentificacion,
} from '../../utils/validacion';

type Props = NativeStackScreenProps<RootStackParamList, 'IngresoIdentificacion'>;

export function IngresoIdentificacionScreen({ navigation }: Props) {
  const [tipoIdentificacion, setTipoIdentificacion] = useState<string | null>(null);
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setConsulta = useEnrolamientoStore((state) => state.setConsulta);
  const insets = useSafeAreaInsets();

  function handleChangeTipo(codigo: string) {
    setTipoIdentificacion(codigo);
    setNumeroIdentificacion('');
  }

  async function handleSubmit() {
    if (tipoIdentificacion === null) {
      setError('Selecciona tu tipo de identificación.');
      return;
    }

    if (!validarFormatoIdentificacion(numeroIdentificacion, tipoIdentificacion)) {
      setError('Ingresa un número de identificación válido.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const datos = await consultarParaEnrolamientoUseCase.execute(tipoIdentificacion, numeroIdentificacion);
      setConsulta(tipoIdentificacion, numeroIdentificacion, datos);
      navigation.navigate('ConfirmacionDatos');
    } catch (err) {
      if (err instanceof EnrolamientoDuplicadoError) {
        setError('Ya tienes una cuenta. Usa "Entrar" para iniciar sesión.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('No pudimos consultar tus datos. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Watermark />

      <View style={styles.header}>
        <Text style={styles.greeting}>¡Hola!</Text>
        <Text style={styles.headline}>Confiamos en ti,{'\n'}sonríe.</Text>
      </View>

      <View style={[styles.form, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.label}>Tipo de identificación</Text>
        <View style={styles.selectorWrapper}>
          <SelectorTipoIdentificacion value={tipoIdentificacion} onChange={handleChangeTipo} />
        </View>

        <Text style={styles.label}>Número de identificación</Text>
        <TextInput
          style={styles.input}
          value={numeroIdentificacion}
          onChangeText={(text) => setNumeroIdentificacion(formatearIdentificacion(text, tipoIdentificacion))}
          placeholder={placeholderIdentificacion(tipoIdentificacion)}
          keyboardType="default"
          autoCapitalize="characters"
          maxLength={maxLengthIdentificacion(tipoIdentificacion)}
        />
        <Text style={styles.hint}>Lo usamos solo para consultar tus datos básicos.</Text>

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        <View style={styles.spacer} />

        {loading ? (
          <ActivityIndicator color={colors.violeta} />
        ) : (
          <Button label="Pide tú →" onPress={handleSubmit} />
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
  header: {
    backgroundColor: colors.moradoOscuro,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },
  greeting: {
    ...typography.body,
    color: colors.amarillo,
    fontWeight: '700',
  },
  headline: {
    ...typography.title,
    color: colors.blanco,
    marginTop: 4,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  label: {
    ...typography.caption,
    color: colors.moradoOscuro,
    fontWeight: '700',
    marginBottom: 6,
  },
  selectorWrapper: {
    marginBottom: 14,
  },
  input: {
    height: 44,
    borderWidth: 1.5,
    borderColor: colors.violeta,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: colors.moradoOscuro,
  },
  hint: {
    ...typography.caption,
    color: '#888780',
    marginTop: 8,
  },
  error: {
    ...typography.caption,
    color: colors.magenta,
    marginTop: 10,
  },
  spacer: {
    flex: 1,
  },
});
