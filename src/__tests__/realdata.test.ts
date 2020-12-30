import { eventAssignment } from '../eventAssignment';
import { realData } from '../__data__/realData';
import { AssignmentElement } from '../typings/assignment';
import { CheckResult } from '../typings/checkResult';
import { scoreAssignment } from '../scoreAssignment';

describe('eventAssignment', () => {
	it('should return an assignment', () => {
		const result = eventAssignment(realData);
		if (determineResult(result)) {
			expect(result.value).toEqual(1);
		} else {
			const score = scoreAssignment(result, realData.L);
			expect(score).toBeGreaterThan(0);
		}
	});
});

function determineResult(result: AssignmentElement[] | CheckResult): result is CheckResult {
	if ((result as CheckResult).value) {
		return true;
	}
	return false;
}
