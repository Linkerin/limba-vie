export function capitalizeWord(word: string) {
  if (word.length <= 0) return null;

  return word[0].toUpperCase() + word.slice(1);
}
