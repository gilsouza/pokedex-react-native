import { useTheme } from '@shopify/restyle';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Loading } from '~/components/Loading';
import { LinearGradient } from 'expo-linear-gradient';

import { usePokemonByNameOrId } from '~/service/api';
import { Box, Text } from '~/theme';
import { Image } from 'expo-image';
import { capitalize } from '~/utils/strings';
import { PokemonInfo } from '~/model/PokemonInfo';
import { convertDecimetersToMeters, convertHectogramsToKilograms } from '~/utils/pokemon';

export default function PokemonDetail() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: pokemon, isFetching, isLoading } = usePokemonByNameOrId(id as string);

  const { name, types, weight, height, color, eggGroup, order, stats } = pokemon as PokemonInfo;

  console.log('name', name);
  console.log('types', types);
  console.log('id', id);
  console.log('order', order);
  console.log('weight', weight);
  console.log('height', height);
  console.log('color', color);
  console.log('eggGroup', eggGroup);
  console.log('stats', stats);

  const firstTypeName = types?.at(0)?.name;
  // const colorLight =
  //   (`${firstTypeName}Light` as keyof typeof theme.colors) || theme.colors.steelLight;
  // const colorDark =
  //   (`${firstTypeName}Dark` as keyof typeof theme.colors) || theme.colors.steelLight;

  // console.log('colorLight', colorLight);
  // console.log('colorDark', colorDark);

  const dark = theme.colors[`${firstTypeName}Dark` as keyof typeof theme.colors];
  const light = theme.colors[`${firstTypeName}Light` as keyof typeof theme.colors];

  const renderLoading = () => {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Loading />
      </Box>
    );
  };

  const renderDetail = () => {
    return (
      <Box flex={1}>
        <Box height={400} marginTop="spacing64">
          <LinearGradient
            colors={[dark, light]}
            start={[0, 0]}
            end={[1, 1]}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '-50%',
              height: '100%',
              borderRadius: 100,
            }}
          />
          <Image
            contentFit={'contain'}
            placeholder="blurhash"
            source={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`}
            style={{
              marginTop: 40,
              height: 200,
            }}
            transition={100}
          />
          <Box flex={1} padding="spacing16">
            <Text variant="large" textAlign="left">
              {capitalize(name)}
            </Text>
            <Text variant="body" textAlign="left">
              {`#${order?.toString().padStart(3, '0')}`}
            </Text>
            <Text variant="body" textAlign="left">
              {`Altura: ${convertDecimetersToMeters(height)}`}
            </Text>
            <Text variant="body" textAlign="left">
              {`Peso: ${convertHectogramsToKilograms(weight)}`}
            </Text>
            <Text variant="body" textAlign="left">
              {`Tipos: ${types.map((type) => type.name)}`}
            </Text>
            <Text variant="body" textAlign="left">
              {`Status: ${stats.map((stat) => stat.name)}`}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{ title: '', headerTransparent: true, headerTintColor: theme.colors.white }}
      />

      {(isFetching || isLoading) && renderLoading()}
      {pokemon && renderDetail()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
