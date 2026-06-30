import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';

const LOGO_ASPECT_RATIO = 3000 / 1666;
const WATERMARK_WIDTH = Dimensions.get('window').width * 0.7;
const WATERMARK_HEIGHT = WATERMARK_WIDTH / LOGO_ASPECT_RATIO;

export function Watermark() {
  return (
    <Image
      source={require('../assets/images/logo-epik.png')}
      style={styles.watermark}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: WATERMARK_WIDTH,
    height: WATERMARK_HEIGHT,
    marginTop: -WATERMARK_HEIGHT / 2,
    marginLeft: -WATERMARK_WIDTH / 2,
    opacity: 0.06,
    pointerEvents: 'none',
  },
});
