import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { typeColors } from './typeColors';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

const palette = {
  lightGray: '#EEEEEE',
  gray: '#808080',
  blue: '#007AFF',
  darkGray: '#38434D',
  white: '#FFFFFF',
  black: '#000000',
  purple: '#6366F1',
  red: '#C82935',
};

const theme = createTheme({
  colors: {
    ...palette, // FIXME: remove later

    mainBackground: palette.lightGray,
    mainForeground: palette.black,

    primaryCardBackground: palette.purple,
    secondaryCardBackground: palette.white,
    primaryCardText: palette.white,
    secondaryCardText: palette.black,

    ...typeColors,
  },
  spacing: {
    spacing4: 4,
    spacing8: 8,
    spacing12: 12,
    spacing16: 16,
    spacing24: 24,
    spacing32: 32,
    spacing64: 64,
  },
  borderRadii: {
    borderRadii3: 3,
    borderRadii6: 6,
    borderRadii12: 12,
    borderRadii24: 24,
    borderRadii1000: 300,
  },
  textVariants: {
    tag: {
      fontSize: 12,
      fontWeight: '700',
    },
    body: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    title: { fontSize: 20, fontWeight: 'bold' },
    large: {
      fontSize: 36,
    },
    extra_large: {
      fontSize: 64,
      fontWeight: 'bold',
    },
    defaults: {
      fontSize: 16,
    },
  },
  inputVariants: {
    defaults: {
      padding: 10,
    },
  },
});

export const useTheme = () => {
  return useRestyleTheme<Theme>();
};

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: (theme: Theme) => T
) => {
  return () => {
    return styles(theme);
  };
};

export type Theme = typeof theme;
export type Color = keyof typeof theme.colors;
export default theme;
