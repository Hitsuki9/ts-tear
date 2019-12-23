import _instanceof from './instanceof';

class GrandParent {}
class Uncle extends GrandParent {}
class Parent extends GrandParent {}
class Son extends Parent {}

test('instanceof is working without bugs', () => {
  expect(_instanceof([], Object)).toBeTruthy();
  expect(_instanceof(() => {}, Object)).toBeTruthy();
  expect(_instanceof(new GrandParent(), Object)).toBeTruthy();
  expect(_instanceof(new Uncle(), GrandParent)).toBeTruthy();
  expect(_instanceof(new Son(), GrandParent)).toBeTruthy();
  expect(_instanceof(new Son(), Uncle)).toBeFalsy();
});
