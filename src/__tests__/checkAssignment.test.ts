import { realData, realAssignment } from '../__data__/realData';
import { checkAssignment } from '../checkAssignment';

describe('checkAssignment', () => {
	it('should return 1', () => {
		const result = checkAssignment(realAssignment, realData.events, realData.groups);
		expect(result.value).toEqual(1);
	});
});
