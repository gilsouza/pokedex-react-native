export const capitalize = (text: string) => {
  if (typeof text !== 'string' || !text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};
