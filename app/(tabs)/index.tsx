import debounce from 'lodash.debounce';

import { Input } from '~/components/Input';
import { PokemonList } from '~/components/PokemonList';
import { useFindPokemon } from '~/hooks/useFindPokemon';
import { usePokemons } from '~/service/api';

export default function Home() {
  const { findPokemon } = useFindPokemon();
  const { data: pokemons, isFetching } = usePokemons();

  console.log('pokemons', pokemons);

  const onChange = debounce(
    (value: string) => {
      if (value) {
        const a = findPokemon(value);
        console.log(JSON.stringify(a));
      }
    },
    500,
    {
      leading: true,
    }
  );

  return (
    <>
      <Input
        placeholder="capture seu pokemon"
        margin="spacing8"
        marginBottom="spacing4"
        onChangeText={onChange}
      />
      <PokemonList isFetching={isFetching} pokemons={pokemons || []} />
    </>
  );
}
