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
  removeListener(type: string, fn: Function) {
    const handlers = this.events.get(type);
    if (handlers) {
      for (const [idx, handler] of handlers.entries()) {
        if (handler === fn) {
          handlers.splice(idx, 1);
          return;
        }
      }
    }
  }
  once(type: string, fn: Function) {
    const wrapper = function(this: EventEmitter, ...args: any[]) {
      fn(...args);
      this.removeListener(type, fn);
    };
    this.addListener(type, wrapper);
  }
  emit(type: string, ...args: any[]) {
    const handlers = this.events.get(type);
    if (handlers) {
      for (let i = 0; i < handlers.length; i++) {
        handlers[i](...args);
      }
    }
    return true;
  }
}
