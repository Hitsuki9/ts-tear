import isCircularRotation from './isCircularRotation';

test('isCircularRotation function is working without bugs', () => {
  expect(isCircularRotation('TAGNAME', 'GNAMETA')).toBeTruthy();
  expect(isCircularRotation('TAGNAME', 'GNAMETB')).toBeFalsy();
});
