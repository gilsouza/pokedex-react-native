import { useTheme } from '@shopify/restyle';
import { Image, ImageContentFit } from 'expo-image';
import { Platform } from 'react-native';

import { PokemonInfo } from '~/model/PokemonInfo';
import { Box, Text } from '~/theme';

interface PokemonCardProps {
  pokemon: PokemonInfo;
  contentFit: ImageContentFit;
}

const PokemonCard = ({ pokemon, contentFit }: PokemonCardProps) => {
  const theme = useTheme();

  const firstTypeName = pokemon.types?.at(0)?.name;
  const colorHex = (`${firstTypeName}Dark` as keyof typeof theme.colors) || theme.colors.steelLight;
  const pokemonNumber = `#${pokemon.order.toString().padStart(3, '0')}`;

  const gePokemonImageUrl = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;

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
        backgroundColor={colorHex}
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
        source={gePokemonImageUrl(pokemon.id)}
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

export type { PokemonCardProps };
export { PokemonCard };
