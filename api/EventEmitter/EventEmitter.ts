export default class EventEmitter {
  events: Map<string, Function[]> = new Map();
  maxListeners = 10;
  addListener(type: string, fn: Function) {
    const handlers = this.events.get(type);
    if (handlers) {
      if (handlers.length >= this.maxListeners) {
        console.warn(
          `can't add listener because the maxListeners is ${this.maxListeners}`
        );
        return;
      }
      handlers.push(fn);
      this.events.set(type, handlers);
    } else {
      this.events.set(type, [fn]);
    }
  }
  emit(type: string, ...args: any[]) {
    const handlers = this.events.get(type);
    if (handlers) {
      for (let i = 0; i < handlers.length; i++) {
        handlers[i](...args)
      }
    }
    return true;
  }
}
