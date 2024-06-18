import { useTheme } from '@shopify/restyle';
import { Image, ImageContentFit } from 'expo-image';
import { Platform } from 'react-native';

import { PokemonListInfo } from '~/model/PokemonInfo';
import { Box, Text } from '~/theme';
import { toPokemonNumber } from '~/utils/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListInfo;
  contentFit: ImageContentFit;
}

const PokemonCard = ({ pokemon, contentFit }: PokemonCardProps) => {
  const theme = useTheme();
  console.log(pokemon);

  const pokemonNumber = toPokemonNumber(pokemon.id);

  return (
    <Box
      alignContent="center"
      backgroundColor="white"
      borderRadius="borderRadii12"
      elevation={5}
      flex={1}
      flexGrow={1}
      justifyContent="center"
      margin="spacing4"
      padding="spacing24"
      style={Platform.select({
        ios: {
          elevation: Platform.OS === 'android' ? 5 : 0,
          shadowColor: theme.colors.gray,
          shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 3 : 0 },
          shadowOpacity: Platform.OS === 'ios' ? 0.4 : 0,
          shadowRadius: Platform.OS === 'ios' ? 3 : 0,
        },
      })}>
      <Box
        alignContent="center"
        borderRadius="borderRadii12"
        justifyContent="center"
        paddingHorizontal="spacing8"
        paddingVertical="spacing4"
        style={{ position: 'absolute', top: 10, right: 10 }}>
        <Text variant="tag" textAlign="center" color="white">
          {pokemonNumber}
        </Text>
      </Box>

      <Image
        contentFit={contentFit}
        placeholder="blurhash"
        source={pokemon.imageUrl}
        style={{
          flex: 1,
        }}
        transition={1000}
      />
      <Text variant="body" textAlign="center" marginTop="spacing12">
        {pokemon.name}
      </Text>
    </Box>
  );
};

export { PokemonCard };
export type { PokemonCardProps };
