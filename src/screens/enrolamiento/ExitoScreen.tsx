import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Button } from '../../components/Button';
import { Watermark } from '../../components/Watermark';
import { useEnrolamientoStore } from '../../state/enrolamientoStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Exito'>;

export function ExitoScreen({ navigation }: Props) {
  const reset = useEnrolamientoStore((state) => state.reset);
  const insets = useSafeAreaInsets();

  function handleIrAIniciarSesion() {
    reset();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  return (
    <View style={styles.container}>
      <Watermark />

      <View style={styles.header}>
        <Text style={styles.greeting}>¡Bienvenido!</Text>
        <Text style={styles.headline}>Tu cuenta ya{'\n'}está lista.</Text>
      </View>

      <View style={[styles.body, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.contenido}>
          <View style={styles.checkBox}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.texto}>Ahora ingresa con tu{'\n'}identificación y clave</Text>
        </View>

        <View style={styles.spacer} />

        <Button label="Ir a iniciar sesión →" onPress={handleIrAIniciarSesion} />
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
  body: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  contenido: {
    alignItems: 'center',
  },
  checkBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEEDFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  checkMark: {
    fontSize: 30,
    color: colors.violeta,
  },
  texto: {
    ...typography.body,
    color: colors.moradoOscuro,
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
  },
});
