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
import { confirmarEnrolamientoUseCase } from '../../composition/enrolamientoModule';
import { useEnrolamientoStore } from '../../state/enrolamientoStore';

type Props = NativeStackScreenProps<RootStackParamList, 'CrearClave'>;

const PIN_LENGTH = 4;

type Paso = 'crear' | 'confirmar';

export function CrearClaveScreen({ navigation }: Props) {
  const [paso, setPaso] = useState<Paso>('crear');
  const [clave, setClave] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const tipoIdentificacion = useEnrolamientoStore((state) => state.tipoIdentificacion);
  const numeroIdentificacion = useEnrolamientoStore((state) => state.numeroIdentificacion);
  const insets = useSafeAreaInsets();

  async function handleTecla(tecla: string) {
    if (tecla === '' || loading) {
      return;
    }

    if (tecla === '⌫') {
      setPin((actual) => actual.slice(0, -1));
      return;
    }

    if (pin.length >= PIN_LENGTH) {
      return;
    }

    const siguiente = pin + tecla;
    setPin(siguiente);

    if (siguiente.length === PIN_LENGTH) {
      if (paso === 'crear') {
        setClave(siguiente);
        setPin('');
        setError('');
        setPaso('confirmar');
        return;
      }

      if (siguiente !== clave) {
        setError('Las claves no coinciden, intenta de nuevo.');
        setPin('');
        setClave('');
        setPaso('crear');
        return;
      }

      if (!tipoIdentificacion || !numeroIdentificacion) {
        setError('Error interno. Vuelve al inicio.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        await confirmarEnrolamientoUseCase.execute(tipoIdentificacion, numeroIdentificacion, siguiente);
        navigation.navigate('Exito');
      } catch {
        setError('No pudimos crear tu cuenta. Intenta de nuevo.');
        setPin('');
        setClave('');
        setPaso('crear');
      } finally {
        setLoading(false);
      }
    }
  }

  const titulo =
    paso === 'crear'
      ? 'Crea una clave de 4 dígitos\npara proteger tu cuenta'
      : 'Confirma tu clave\nde 4 dígitos';

  return (
    <View style={styles.container}>
      <Watermark />

      <ScreenHeader title="Crea tu clave" onBack={() => navigation.goBack()} />

      <View style={[styles.body, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.titulo}>{titulo}</Text>

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        {loading ? (
          <ActivityIndicator color={colors.violeta} style={styles.spinner} />
        ) : (
          <TecladoPin pin={pin} longitud={PIN_LENGTH} onTecla={handleTecla} />
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
  titulo: {
    ...typography.body,
    color: colors.moradoOscuro,
    textAlign: 'center',
    marginBottom: 18,
  },
  error: {
    ...typography.caption,
    color: colors.magenta,
    marginBottom: 12,
  },
  spinner: {
    marginTop: 40,
  },
});
