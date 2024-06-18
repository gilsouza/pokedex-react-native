import { PokemonListInfo } from '~/model/PokemonInfo';

export interface PokemonState {
  captured: PokemonListInfo[];
  capture: (pokemon: PokemonListInfo) => void;
  release: (id: number) => void;
}
