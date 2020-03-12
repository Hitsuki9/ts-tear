/**
 * 最大公约数算法
 * @param a
 * @param b
 */
export default function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
