import { useMemo } from 'react';

import { Input } from '~/components/Input';
import { PokemonList } from '~/components/PokemonList';
import { usePokemons } from '~/service/api';

export default function Home() {
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = usePokemons();

  const pokemons = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.results) : [];
  }, [data]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <Input placeholder="capture seu pokemon" margin="spacing8" marginBottom="spacing4" />
      <PokemonList
        pokemons={pokemons}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetching}
        loadMore={loadMore}
      />
    </>
  );
}
