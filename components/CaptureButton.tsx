import FontAwesome from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@shopify/restyle';
import { forwardRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';

import { useCapturePokemon } from '~/hooks/useCapturePokemon';

export const CaptureButton = forwardRef<typeof Pressable, { pokemonId: number }>(
  ({ pokemonId }, ref) => {
    const theme = useTheme();
    const { capture, hasCaptured, release } = useCapturePokemon();

    const captured = hasCaptured(pokemonId);

    const onPress = () => {
      if (captured) {
        release(pokemonId);
        Toast.show('Pokemon libertado com sucesso', {
          duration: Toast.durations.SHORT,
        });
      } else {
        capture(pokemonId);
        Toast.show('Pokemon capturado com sucesso', {
          duration: Toast.durations.SHORT,
        });
      }
    };

    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <FontAwesome
            name="catching-pokemon"
            size={30}
            color={captured ? theme.colors.gray : theme.colors.white}
            style={[
              styles.headerRight,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          />
        )}
      </Pressable>
    );
  }
);

export const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
});
