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
import { TextInput } from 'react-native';

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
        borderWidth={1}
        flexDirection="row"
        justifyContent="space-between"
        elevation={3}
        borderColor="lightGray"
        borderRadius="borderRadii6"
        padding="spacing12"
        backgroundColor="white">
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
