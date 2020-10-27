import { randomAssignment } from '../randomAssignment';
import { mockData } from '../__data__/mockData';

describe('randomAssignment', () => {
	it('should return best assignment', () => {
		const result = randomAssignment(mockData);
		expect(result[0].assignment).toEqual(1);
		expect(result[1].assignment).toEqual(2);
		expect(result[2].assignment).toEqual(3);
		expect(result[0].id).toEqual(1);
		expect(result[1].id).toEqual(2);
		expect(result[2].id).toEqual(3);
	});
});
