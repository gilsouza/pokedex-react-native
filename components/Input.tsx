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
      {label && <Text variant="body">{label}</Text>}
      <Box
        elevation={3}
        flexDirection="row"
        justifyContent="space-between"
        borderColor="lightGray"
        borderRadius="borderRadii6"
        padding="spacing12"
        backgroundColor="white"
        style={Platform.select({
          ios: {
            shadowColor: theme.colors.gray,
            shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 1 : 0 },
            shadowOpacity: Platform.OS === 'ios' ? 0.4 : 0,
            shadowRadius: Platform.OS === 'ios' ? 2 : 0,
            elevation: Platform.OS === 'android' ? 3 : 0,
          },
        })}>
        <TextInput
          placeholderTextColor={theme.colors.gray}
          placeholder={placeholder}
          style={{
            fontSize: theme.textVariants.body.fontSize,
            color: theme.colors.black,
            flex: 1,
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
