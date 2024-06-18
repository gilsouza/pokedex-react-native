import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Loading } from '~/components/Loading';

import { usePokemonByNameOrId } from '~/service/api';
import { Box, Text } from '~/theme';

export default function PokemonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: pokemon, isFetching, isLoading } = usePokemonByNameOrId(id as string);

  const { name, types, weight, height, color, eggGroup, order, stats } = pokemon || {};

  console.log('name', name);
  console.log('types', types);
  console.log('id', id);
  console.log('order', order);
  console.log('weight', weight);
  console.log('height', height);
  console.log('color', color);
  console.log('eggGroup', eggGroup);
  console.log('stats', stats);

  const loading = () => {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Loading />
      </Box>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: pokemon?.name }} />

      {(isFetching || isLoading) && loading()}
      {pokemon && <Text>{name}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
