import { eventAssignment } from '../eventAssignment';
import { mockData } from '../__data__/mockData';
import { AssignmentElement } from '../typings/assignment';
import { CheckResult } from '../typings/checkResult';

describe('eventAssignment', () => {
	it('should return best assignment', () => {
		const result = eventAssignment(mockData);
		if (determineResult(result)) {
			expect(0).toEqual(1);
		} else {
			expect(result[0].assignment).toEqual(1);
			expect(result[1].assignment).toEqual(2);
			expect(result[2].assignment).toEqual(3);
			expect(result[0].id).toEqual(1);
			expect(result[1].id).toEqual(2);
			expect(result[2].id).toEqual(3);
		}
	});
});

function determineResult(result: AssignmentElement[] | CheckResult): result is CheckResult {
	if ((result as CheckResult).value) {
		return true;
	}
	return false;
}
