import { useCallback } from 'react';

import { PokemonListInfo } from '~/model/PokemonInfo';
import { usePokemonStore } from '~/store/usePokemonStore';

export const useCapturePokemon = () => {
  const captured = usePokemonStore((state) => state.captured);
  const _capture = usePokemonStore((state) => state.capture);
  const _release = usePokemonStore((state) => state.release);

  const capture = useCallback((pokemon: PokemonListInfo) => {
    _capture(pokemon);
  }, []);

  const release = useCallback((pokemonId: number) => {
    _release(pokemonId);
  }, []);

  const hasCaptured = useCallback(
    (pokemonId: number) => captured.some((pokemon) => pokemon.id === pokemonId),
    [captured]
  );

  return {
    capture,
    release,
    hasCaptured,
  };
};
