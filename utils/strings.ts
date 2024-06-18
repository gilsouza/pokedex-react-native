export const capitalize = (text: string) => {
  if (typeof text !== 'string' || !text) return '';
  return text
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
