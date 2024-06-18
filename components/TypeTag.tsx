import { useTheme } from '@shopify/restyle';
import { Platform } from 'react-native';

import { Box, Text, Color } from '~/theme';

interface TypeTagProps {
  text: string;
  color: Color;
}

const TypeTag = ({ text, color }: TypeTagProps) => {
  const theme = useTheme();

  return (
    <Box
      minWidth={100}
      padding="spacing8"
      borderRadius="borderRadii24"
      elevation={3}
      backgroundColor={color}
      marginBottom="spacing8"
      marginRight="spacing8"
      style={Platform.select({
        ios: {
          elevation: Platform.OS === 'android' ? 3 : 0,
          shadowColor: theme.colors.gray,
          shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 1 : 0 },
          shadowOpacity: Platform.OS === 'ios' ? 0.4 : 0,
          shadowRadius: Platform.OS === 'ios' ? 2 : 0,
        },
      })}>
      <Text variant="tag" textAlign="center" color="white" verticalAlign="middle">
        {text}
      </Text>
    </Box>
  );
};

export type { TypeTagProps };
export { TypeTag };
