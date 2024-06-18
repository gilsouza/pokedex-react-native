import { useCallback } from 'react';

import { usePokemonStore } from '~/store/pokemon';

export const useCapturePokemon = () => {
  const captured = usePokemonStore((state) => state.captured);
  const _capture = usePokemonStore((state) => state.capture);
  const _release = usePokemonStore((state) => state.release);

  const capture = useCallback((pokemonId: number) => {
    _capture(pokemonId);
  }, []);

  const release = useCallback((pokemonId: number) => {
    _release(pokemonId);
  }, []);

  const hasCaptured = useCallback(
    (pokemonId: number) => captured.some((id) => id === pokemonId),
    [captured]
  );

  return {
    capture,
    release,
    hasCaptured,
  };
};
