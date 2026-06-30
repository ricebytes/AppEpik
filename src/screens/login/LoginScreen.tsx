import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Button } from '../../components/Button';
import { SelectorTipoIdentificacion } from '../../components/SelectorTipoIdentificacion';
import { TecladoPin } from '../../components/TecladoPin';
import { Watermark } from '../../components/Watermark';
import { useSesionStore } from '../../state/sesionStore';
import { validarFormatoIdentificacion } from '../../utils/validacion';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const PIN_LENGTH = 4;

export function LoginScreen({ navigation }: Props) {
  const [tipoIdentificacion, setTipoIdentificacion] = useState<string | null>(null);
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [pin, setPin] = useState('');
  const login = useSesionStore((state) => state.login);
  const limpiarError = useSesionStore((state) => state.limpiarError);
  const error = useSesionStore((state) => state.error);
  const insets = useSafeAreaInsets();

  const puedeEnviar =
    tipoIdentificacion !== null &&
    validarFormatoIdentificacion(numeroIdentificacion) &&
    pin.length === PIN_LENGTH;

  function handleTecla(tecla: string) {
    if (tecla === '') {
      return;
    }

    if (error.length > 0) {
      limpiarError();
    }

    if (tecla === '⌫') {
      setPin((actual) => actual.slice(0, -1));
      return;
    }

    if (pin.length >= PIN_LENGTH) {
      return;
    }

    setPin((actual) => actual + tecla);
  }

  function handleSubmit() {
    if (!puedeEnviar || tipoIdentificacion === null) {
      return;
    }

    login(tipoIdentificacion, numeroIdentificacion, pin);
    navigation.navigate('ValidandoLogin');
  }

  return (
    <View style={styles.container}>
      <Watermark />

      <View style={styles.header}>
        <Text style={styles.greeting}>¡Hola de nuevo!</Text>
        <Text style={styles.headline}>Confiamos en ti,{'\n'}sonríe.</Text>
      </View>

      <View style={[styles.form, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.label}>Tipo de identificación</Text>
        <View style={styles.selectorWrapper}>
          <SelectorTipoIdentificacion value={tipoIdentificacion} onChange={setTipoIdentificacion} />
        </View>

        <Text style={styles.label}>Número de identificación</Text>
        <TextInput
          style={styles.input}
          value={numeroIdentificacion}
          onChangeText={setNumeroIdentificacion}
          placeholder="1 234 567 890"
          autoCapitalize="none"
          keyboardType="default"
        />

        <Text style={styles.label}>Clave de 4 dígitos</Text>
        <TecladoPin pin={pin} longitud={PIN_LENGTH} onTecla={handleTecla} />

        <Pressable style={styles.olvidasteClave}>
          <Text style={styles.olvidasteClaveTexto}>¿Olvidaste tu clave?</Text>
        </Pressable>

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        <View style={styles.spacer} />

        <Button label="Entrar →" onPress={handleSubmit} disabled={!puedeEnviar} />

        <Text style={styles.nuevoTexto}>¿Eres nuevo en epik?</Text>
        <Button
          label="Crea tu cuenta"
          variant="secondary"
          onPress={() => navigation.navigate('IngresoIdentificacion')}
        />
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
    marginBottom: 14,
  },
  olvidasteClave: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  olvidasteClaveTexto: {
    ...typography.caption,
    color: colors.violeta,
  },
  error: {
    ...typography.caption,
    color: colors.magenta,
    marginTop: 10,
  },
  spacer: {
    flex: 1,
  },
  nuevoTexto: {
    ...typography.caption,
    color: '#888780',
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 8,
  },
});
