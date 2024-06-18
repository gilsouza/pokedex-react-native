import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { httpClient } from './clientConfig';

import { Page } from '~/model/PageResponse';
import { PokemonInfo, PokemonListInfo } from '~/model/PokemonInfo';
import {
  PokemonDetailsResponse,
  PokemonListResponse,
  PokemonResponse,
  SpeciesDetailsResponse,
} from '~/model/PokemonResponse';
import { getIdFromUrlDetails, getImageUrlById } from '~/utils/pokemon';

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
    stats: data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    types: data.types.map((type) => type.type),
    weight: data.weight,
    imageUrl: getImageUrlById(data.id),
  };

  return pokemonDetails;
};

const fetchPaginatedPokemons = async (nextUrl?: string): Promise<Page<PokemonInfo>> => {
  const next = nextUrl || '/pokemon?limit=10';
  const { data } = await httpClient.get<Page<PokemonResponse>>(next);

  const pokemonDetailsPromises = data.results.map((pokemon) => fetchPokemonDetails(pokemon.url));
  const pokemonsWithDetails = await Promise.all(pokemonDetailsPromises);

  return { ...data, results: pokemonsWithDetails };
};

export const useInfinityPokemons = () => {
  return useInfiniteQuery<Page<PokemonInfo>, Error>({
    queryKey: ['pokemons-paginated'],
    queryFn: ({ pageParam }) => fetchPaginatedPokemons(pageParam as string),
    initialPageParam: null,
    getNextPageParam: (lastPage: Page<PokemonInfo>) => lastPage.next,
  });
};

const fetchAllPokemons = async (): Promise<PokemonListInfo[]> => {
  const { data } = await httpClient.get<Page<PokemonListResponse>>(
    '/pokemon?limit=100000&offset=0' // fetch all
  );

  const list: PokemonListInfo[] = data.results.map((pokemonResponse: PokemonListResponse) => {
    const pokemonId = getIdFromUrlDetails(pokemonResponse.url);
    return {
      name: pokemonResponse.name,
      imageUrl: getImageUrlById(pokemonId),
      id: pokemonId,
    };
  });

  return list;
};

export const usePokemons = () => {
  return useQuery<PokemonListInfo[]>({
    queryKey: ['pokemons-all'],
    queryFn: () => fetchAllPokemons(),
  });
};

const fetchPokemonByNameOrId = async (nameOrId: NameOrIdParam) => {
  const { data } = await httpClient.get<PokemonDetailsResponse>(`/pokemon/${nameOrId}`);

  const specieInfo = await fetchSpecies(data.species.url);

  const pokemonDetails: PokemonInfo = {
    color: specieInfo.color,
    eggGroup: specieInfo.egg_groups,
    height: data.height,
    id: data.id,
    order: data.order,
    name: data.name,
    stats: data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    types: data.types.map((type) => type.type),
    weight: data.weight,
    imageUrl: getImageUrlById(data.id),
  };

  return pokemonDetails;
};

export const usePokemonByNameOrId = (nameOrId: NameOrIdParam) => {
  return useQuery<PokemonInfo>({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemonByNameOrId(nameOrId),
  });
};
