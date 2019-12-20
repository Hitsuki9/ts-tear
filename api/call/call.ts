export default function call(
  this: Function & Record<string | number | symbol, any>,
  context: Record<string | number | symbol, any>,
  ...args: any[]
) {
  const fn = Symbol();
  // @ts-ignore
  context[fn] = this;
  const res = context.fn(...args);
  Reflect.deleteProperty(context, 'fn');
  return res;
}
