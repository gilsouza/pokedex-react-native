import { Stat } from '~/model/PokemonInfo';

export type StatInfo = {
  actual: number;
  max: number;
};

const MAX_STATUS: Record<string, number> = {
  'special-attack': 200,
  'special-defense': 230,
  attack: 190,
  defense: 230,
  hp: 255,
  speed: 180,
};

export const convertStatToStatInfo = (statInfo: Stat): StatInfo => ({
  actual: statInfo.value,
  max: MAX_STATUS[statInfo.name],
});

export const convertDecimetersToMeters = (decimeters: number): string =>
  `${parseFloat((decimeters / 10).toFixed(1))} m`;

export const convertHectogramsToKilograms = (hectograms: number): string =>
  `${parseFloat((hectograms / 10).toFixed(1))} kg`;

export const toPokemonNumber = (order: number): string => `#${order.toString().padStart(3, '0')}`;

export const getIdFromUrlDetails = (url: string): number => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const segments = pathname.split('/').filter((segment) => segment !== '');

  return Number(segments[segments.length - 1]);
};

export const getImageUrlById = (pokemonId: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonId}.gif`;
