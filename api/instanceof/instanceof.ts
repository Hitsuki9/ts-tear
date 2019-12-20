/**
 * instanceof
 * @param l Left-hand side
 * @param r Right-hand side
 */
export default function _instanceof(
  l: Record<string | number | symbol, any>,
  r: Function
) {
  const o = r.prototype;
  l = Object.getPrototypeOf(l);
  while (true) {
    if (l === null) return false;
    if (l === o) return true;
    l = Object.getPrototypeOf(l);
  }
}
