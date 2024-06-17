export interface Type {
  name: string;
}

export interface Stat {
  name: string;
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

export interface StatsResponse {
  stat: Stat;
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

// companion object {
//   const val maxHp = 255
//   const val maxAttack = 190
//   const val maxDefense = 230
//   const val maxSpAttack = 200
//   const val maxSpDefense = 230
//   const val maxSpeed = 180
// }
