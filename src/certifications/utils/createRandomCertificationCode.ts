export const CODE_LENGTH = 6;

export function createRandomCertificationCode(): string {
  const random = Math.floor(Math.random() * 1000000);
  const code = random.toString().padStart(CODE_LENGTH, '0');
  return code;
}
