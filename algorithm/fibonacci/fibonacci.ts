/**
 * 求斐波那契数列的第 n 项
 */
export default function fibonacci() {
  const cache: number[] = [];
  return function handle(n: number): number {
    if (n <= 1) return n;
    if (cache[n]) return cache[n];
    return (cache[n] = handle(n - 1) + handle(n - 2));
  };
}
