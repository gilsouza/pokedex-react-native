import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { capture, release } from './storeService';

import { PokemonInfo } from '~/model/PokemonInfo';

interface PokemonState {
  captured: PokemonInfo[];
  capture: (pokemon: PokemonInfo) => void;
  release: (id: number) => void;
}

export const usePokemonStore = create<PokemonState>()(
  persist(
    (set) => ({
      captured: [],
      capture: (pokemon: PokemonInfo) => set(capture(pokemon)),
      release: (id: number) => set(release(id)),
    }),
    {
      name: 'pokemons-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
