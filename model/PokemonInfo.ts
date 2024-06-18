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
