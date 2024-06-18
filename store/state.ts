import { PokemonInfo } from '~/model/PokemonInfo';

export interface PokemonState {
  captured: PokemonInfo[];
  capture: (pokemon: PokemonInfo) => void;
  release: (id: number) => void;
}
