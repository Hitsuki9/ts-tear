import _EventEmitter from './EventEmitter';

const eventBus = new _EventEmitter();
const CODE = 200;
function noop() {}

test('EventEmitter is working without bugs', () => {
  function handleTest(this: Function[], code: number) {
    expect(code).toBe(CODE);
    const len = this.length;
    expect(len).toBe(1);
  }
  eventBus.addListener('test', handleTest);
  eventBus.addListener('test', noop);
  expect(eventBus.events.get('test')).toEqual([handleTest, noop]);
  eventBus.removeListener('test', noop);
  eventBus.emit('test', CODE);
});
