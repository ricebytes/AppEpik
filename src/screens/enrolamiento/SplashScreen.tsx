import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const LOGO_WIDTH = 180;
const LOGO_HEIGHT = LOGO_WIDTH / (3000 / 1666);

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const AUTO_NAVIGATE_DELAY_MS = 1200;

export function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, AUTO_NAVIGATE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-epik-blanco.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.tagline}>Soluciones financieras{'\n'}evolucionadas y seguras</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.moradoOscuro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    marginBottom: 14,
  },
  tagline: {
    ...typography.caption,
    color: colors.grisClaro,
    textAlign: 'center',
    marginTop: 6,
  },
});
