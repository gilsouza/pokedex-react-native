import { Stack } from 'expo-router';

import { PokemonList } from '~/components/PokemonList';
import { usePokemonStore } from '~/store/usePokemonStore';

export default function BackTrack() {
  const pokemons = usePokemonStore((store) => store.captured);
  return (
    <>
      <Stack.Screen options={{ title: 'Meus Pokemons' }} />
      <>
        <PokemonList isFetching={false} pokemons={pokemons || []} />
      </>
    </>
  );
}
