import { PokemonState } from './state';

import { PokemonListInfo } from '~/model/PokemonInfo';

export const capture = (
  pokemon: PokemonListInfo
):
  | PokemonState
  | Partial<PokemonState>
  | ((state: PokemonState) => PokemonState | Partial<PokemonState>) => {
  return (state) => {
    const newCaptured = state.captured.some((p) => p.id === pokemon.id)
      ? state.captured
      : [...state.captured, pokemon];

    return {
      captured: newCaptured.sort((a, b) => a.id - b.id),
    };
  };
};

export const release = (
  id: number
):
  | PokemonState
  | Partial<PokemonState>
  | ((state: PokemonState) => PokemonState | Partial<PokemonState>) => {
  return (state) => ({
    captured: state.captured.filter((p) => p.id !== id),
  });
};
