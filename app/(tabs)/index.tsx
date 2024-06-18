import { useMemo } from 'react';
import debounce from 'lodash.debounce';

import { Input } from '~/components/Input';
import { PokemonList } from '~/components/PokemonList';
import { usePokemons } from '~/service/api';
import { useFindPokemon } from '~/hooks/useFindPokemon';

export default function Home() {
  const { findPokemon } = useFindPokemon();
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = usePokemons();

  const pokemons = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.results) : [];
  }, [data]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

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
      <PokemonList
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        loadMore={loadMore}
        pokemons={pokemons}
      />
    </>
  );
}
