export function generateNumericToken(
  length: number = 6,
  alphabet: string = '1234567890',
): string {
  let id = '';
  let i = length;
  while (i--) {
    id += alphabet[(Math.random() * alphabet.length) | 0];
  }
  return id;
}
