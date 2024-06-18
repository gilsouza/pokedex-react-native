import { Color, EggGroup, Type } from './PokemonInfo';

export interface TypeResponse {
  slot: number;
  type: Type;
}

export interface StatResponse {
  name: string;
}

export interface StatsResponse {
  stat: StatResponse;
  base_stat: number;
}

export interface PokemonDetailsResponse {
  id: number;
  order: number;
  name: string;
  height: number;
  weight: number;
  types: TypeResponse[];
  stats: StatsResponse[];
  species: SpeciesResponse;
}

export interface PokemonResponse {
  name: string;
  url: string;
}

export interface SpeciesResponse {
  name: string;
  url: string;
}

export interface SpeciesDetailsResponse {
  color: Color;
  egg_groups: EggGroup[];
}

export interface PokemonListResponse {
  name: string;
  url: string;
}
