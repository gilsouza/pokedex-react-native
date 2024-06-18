import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { PokemonListInfo } from '~/model/PokemonInfo';

export const useFindPokemon = () => {
  const queryClient = useQueryClient();

  const allPokemonsData = queryClient.getQueriesData<PokemonListInfo[]>({
    exact: true,
    queryKey: ['pokemons-all'],
  });

  const findPokemonById = useCallback(
    (pokemonName: string): PokemonListInfo[] => {
      const filteredPokemons = allPokemonsData
        .flatMap(([_, queryData]) =>
          queryData?.filter(
            (pokemon) => pokemon.name.includes(pokemonName) || pokemon.id === Number(pokemonName)
          )
        )
        .filter(Boolean) as PokemonListInfo[];

      return filteredPokemons;
    },
    [allPokemonsData]
  );

  return {
    findPokemonById,
  };
};
