import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { httpClient } from './clientConfig';

import { Page } from '~/model/PageResponse';
import {
  PokemonDetailsResponse,
  PokemonInfo,
  PokemonResponse,
  SpeciesDetailsResponse,
} from '~/model/PokemonInfo';

type NameOrIdParam = string | number;

const fetchSpecies = async (url: string): Promise<SpeciesDetailsResponse> => {
  const { data } = await httpClient.get<SpeciesDetailsResponse>(url);
  return data;
};

const fetchPokemonDetails = async (url: string) => {
  const { data } = await httpClient.get<PokemonDetailsResponse>(url);

  const specieInfo = await fetchSpecies(data.species.url);

  const pokemonDetails: PokemonInfo = {
    color: specieInfo.color,
    eggGroup: specieInfo.egg_groups,
    height: data.height,
    id: data.id,
    order: data.order,
    name: data.name,
    stats: data.stats.map((stat) => stat.stat),
    types: data.types.map((type) => type.type),
    weight: data.weight,
  };

  return pokemonDetails;
};

const fetchPokemons = async (nextUrl?: string): Promise<Page<PokemonInfo>> => {
  const next = nextUrl || '/pokemon?limit=10';
  const { data } = await httpClient.get<Page<PokemonResponse>>(next);

  const pokemonDetailsPromises = data.results.map((pokemon) => fetchPokemonDetails(pokemon.url));
  const pokemonsWithDetails = await Promise.all(pokemonDetailsPromises);

  return { ...data, results: pokemonsWithDetails };
};

export const usePokemons = () => {
  return useInfiniteQuery<Page<PokemonInfo>, Error>({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam }) => fetchPokemons(pageParam as string),
    initialPageParam: null,
    getNextPageParam: (lastPage: Page<PokemonInfo>) => lastPage.next,
  });
};

const fetchPokemonByNameOrId = async (nameOrId: NameOrIdParam) => {
  const { data } = await httpClient.get(`/pokemon/${nameOrId}`);
  return data;
};

export const usePokemonByNameOrId = (nameOrId: NameOrIdParam) => {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemonByNameOrId(nameOrId),
  });
};

// const fetchEggGroupByNameOrId = async (nameOrId: NameOrIdParam) => {
//   const { data } = await httpClient.get(`/egg-group/${nameOrId}`);
//   return data;
// };

// export const useEggGroupByNameOrId = (nameOrId: NameOrIdParam) => {
//   return useQuery({
//     queryKey: ['eggGroup', nameOrId],
//     queryFn: () => fetchEggGroupByNameOrId(nameOrId),
//   });
// };
