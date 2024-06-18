import debounce from 'lodash.debounce';
import { useState } from 'react';

import { Input } from '~/components/Input';
import { PokemonList } from '~/components/PokemonList';
import { useFindPokemon } from '~/hooks/useFindPokemon';
import { PokemonListInfo } from '~/model/PokemonInfo';
import { usePokemons } from '~/service/api';

export default function Home() {
  const [searchResult, setSearchResult] = useState<PokemonListInfo[]>([]);
  const { data: pokemons, isFetching } = usePokemons();
  const { findPokemonById } = useFindPokemon();

  const onChange = debounce(
    (value: string) => {
      if (value) {
        const result = findPokemonById(value.toLowerCase());
        setSearchResult(result || []);
      } else {
        setSearchResult([]);
      }
    },
    500,
    {
      trailing: true,
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
      <PokemonList
        isFetching={isFetching && !searchResult.length}
        pokemons={searchResult.length ? searchResult : pokemons || []}
      />
    </>
  );
}
