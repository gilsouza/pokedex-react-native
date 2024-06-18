import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PokemonState {
  captured: number[];
  capture: (id: number) => void;
  release: (id: number) => void;
}

export const usePokemonStore = create<PokemonState>()(
  persist(
    (set) => ({
      captured: [],
      capture: (id: number) =>
        set((state) => ({
          captured: state.captured.includes(id) ? state.captured : [...state.captured, id],
        })),
      release: (id: number) =>
        set((state) => ({
          captured: state.captured.filter((capturedId) => capturedId !== id),
        })),
    }),
    {
      name: 'pokemons-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
