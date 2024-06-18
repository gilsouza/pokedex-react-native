import { FontAwesome } from '@expo/vector-icons';
import {
  BackgroundColorProps,
  BorderProps,
  SpacingProps,
  backgroundColor,
  border,
  composeRestyleFunctions,
  spacing,
  useRestyle,
  useTheme,
} from '@shopify/restyle';
import React from 'react';
import { Platform, TextInput } from 'react-native';

import { Box, Text, Theme } from '~/theme';

type RestyleProps = SpacingProps<Theme> & BorderProps<Theme> & BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
]);

interface InputProps extends React.ComponentProps<typeof TextInput>, RestyleProps {
  label?: string;
  placeholder?: string;
}

const Input = ({ label, placeholder, ...rest }: InputProps) => {
  const props = useRestyle(restyleFunctions, rest);
  const theme = useTheme<Theme>();

  return (
    <Box {...props}>
      {label && <Text variant="input">{label}</Text>}
      <Box
        backgroundColor="white"
        borderColor="lightGray"
        borderRadius="borderRadii6"
        elevation={3}
        flexDirection="row"
        justifyContent="space-between"
        padding="spacing12"
        style={Platform.select({
          ios: {
            elevation: Platform.OS === 'android' ? 3 : 0,
            shadowColor: theme.colors.gray,
            shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 1 : 0 },
            shadowOpacity: Platform.OS === 'ios' ? 0.4 : 0,
            shadowRadius: Platform.OS === 'ios' ? 2 : 0,
          },
        })}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray}
          style={{
            color: theme.colors.black,
            flex: 1,
            fontSize: theme.textVariants.input.fontSize,
            marginRight: theme.spacing.spacing8,
          }}
          {...rest}
        />
        <FontAwesome name="search" size={25} color={theme.colors.gray} />
      </Box>
    </Box>
  );
};

export type { InputProps };
export { Input };
