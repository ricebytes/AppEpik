import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
}

const SIDE_SLOT_WIDTH = 32;

export function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={12} style={styles.sideSlot}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
      ) : (
        <View style={styles.sideSlot} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.sideSlot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.moradoOscuro,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sideSlot: {
    width: SIDE_SLOT_WIDTH,
  },
  backArrow: {
    color: colors.amarillo,
    fontSize: 22,
  },
  title: {
    ...typography.subtitle,
    color: colors.blanco,
    flex: 1,
    textAlign: 'center',
  },
});
