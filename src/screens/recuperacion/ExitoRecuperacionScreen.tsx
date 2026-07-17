import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Button } from '../../components/Button';
import { Watermark } from '../../components/Watermark';

type Props = NativeStackScreenProps<RootStackParamList, 'ExitoRecuperacion'>;

export function ExitoRecuperacionScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
      <Watermark />

      <View style={styles.body}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>✓</Text>
        </View>

        <Text style={styles.titulo}>¡Clave actualizada!</Text>
        <Text style={styles.descripcion}>
          Tu clave fue actualizada con éxito.{'\n'}Ya puedes iniciar sesión con tu nueva clave.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          label="Ir a iniciar sesión →"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.violeta,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: { fontSize: 36, color: colors.blanco, fontWeight: '700' },
  titulo: { ...typography.title, color: colors.moradoOscuro, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  descripcion: { ...typography.body, color: '#666', textAlign: 'center', lineHeight: 22 },
  footer: { paddingHorizontal: 20 },
});
