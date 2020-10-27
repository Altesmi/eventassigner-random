import { scoreAssignment } from '../scoreAssignment';
import { AssignmentElement } from '../typings/assignment';
import { ListElement } from '../typings/list';

const mockAssignment: AssignmentElement[] = [
	{ id: 32, assignment: 1 },
	{ id: 5, assignment: 1 },
	{ id: 125, assignment: 1 },
	{ id: 22, assignment: -1 },
	{ id: 2, assignment: 2 },
];

const mockList: ListElement[] = [
	{ id: 32, size: 4, event: 1, gain: 0.5 },
	{ id: 5, size: 1, event: 1, gain: 1 },
	{ id: 125, size: 1, event: 1, gain: 1 },
	{ id: 22, size: 3, event: -1, gain: 1 },
	{ id: 2, size: 1, event: 2, gain: 0.5 },
];

describe('scoreAssignment', () => {
	it('should return correct score', () => {
		const result = scoreAssignment(mockAssignment, mockList);
		expect(result).toEqual(3);
	});
});
