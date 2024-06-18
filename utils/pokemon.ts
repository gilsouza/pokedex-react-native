export const convertDecimetersToMeters = (decimeters: number): string => {
  return `${parseFloat((decimeters / 10).toFixed(1))} m`;
};

export const convertHectogramsToKilograms = (hectograms: number): string => {
  return `${parseFloat((hectograms / 10).toFixed(1))} kg`;
};
