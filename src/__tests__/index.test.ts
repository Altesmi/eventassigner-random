import { eventAssignment } from '../index';

test('test test', () => {
  expect(eventAssignment(['1', '2'])).toEqual(`your input is 1,2`);
});
