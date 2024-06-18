import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { PokemonInfo } from '~/model/PokemonInfo';

export const useFindPokemon = () => {
  const queryClient = useQueryClient();

  const allPokemonsData = queryClient.getQueriesData<PokemonInfo>({
    exact: true,
    queryKey: ['pokemons'],
  });

  console.log(allPokemonsData);

  const findPokemon = useCallback(
    (pokemonName: string) => {
      // Filtra os dados para encontrar o Pokémon específico
      const filteredPokemons = allPokemonsData.filter(([queryKey, queryData]) => {
        return queryData.pages.some((page) =>
          page.results.some((pokemon) => pokemon.name.includes(pokemonName))
        );
      });

      // Extrai apenas o Pokémon específico dos dados filtrados
      const specificPokemon = filteredPokemons
        .map(([queryKey, queryData]) => {
          const pokemon = queryData.pages
            .flatMap((page) => page.results)
            .find((pokemon) => pokemon.name.includes(pokemonName));
          return pokemon;
        })
        .filter((pokemon) => pokemon !== undefined);

      return specificPokemon;
    },
    [allPokemonsData]
  );

  return {
    findPokemon,
  };
};
