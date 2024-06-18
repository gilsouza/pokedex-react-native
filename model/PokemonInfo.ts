export interface Type {
  name: string;
}

export interface Stat {
  name: string;
  value: number;
}

export interface Color {
  name: string;
}

export interface EggGroup {
  name: string;
}

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

export interface PokemonListInfo {
  name: string;
  imageUrl: string;
  id: number;
}

export interface PokemonInfo {
  id: number;
  order: number;
  name: string;
  height: number;
  weight: number;
  types: Type[];
  stats: Stat[];
  color: Color;
  eggGroup: EggGroup[];
  imageUrl: string;
}

export interface PokemonModel {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Type[];
  stats: Stat[];
  color: Color;
  eggGroup: EggGroup[];
  isFavorite: boolean;
}
