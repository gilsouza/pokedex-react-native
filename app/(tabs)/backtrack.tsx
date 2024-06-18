import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { PokemonList } from '~/components/PokemonList';

export default function BackTrack() {
  return (
    <>
      <Stack.Screen options={{ title: 'Meus Pokemons' }} />
      <>
        <PokemonList isFetching={false} pokemons={pokemons || []} />
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
