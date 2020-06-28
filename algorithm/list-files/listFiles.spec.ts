import path from 'path';
import listFiles from './listFiles';

test('listFiles function is working without bugs', () => {
  listFiles(path.join(__dirname, '../'));
});
