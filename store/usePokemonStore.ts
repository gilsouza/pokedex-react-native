import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { PokemonListInfo } from '~/model/PokemonInfo';

interface PokemonState {
  captured: PokemonListInfo[];
  capture: (pokemon: PokemonListInfo) => void;
  release: (id: number) => void;
}

export const usePokemonStore = create<PokemonState>()(
  persist(
    (set) => ({
      captured: [],
      capture: (pokemon: PokemonListInfo) =>
        set((state) => {
          const newCaptured = state.captured.some((p) => p.id === pokemon.id)
            ? state.captured
            : [...state.captured, pokemon];

          return {
            captured: newCaptured.sort((a, b) => a.id - b.id),
          };
        }),
      release: (id: number) =>
        set((state) => ({
          captured: state.captured.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'pokemons-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
