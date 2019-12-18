/**
 * 防抖
 * @param fn 执行函数
 * @param delay 延迟毫秒数
 */
export default function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  let timer: number;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  }) as T;
}
