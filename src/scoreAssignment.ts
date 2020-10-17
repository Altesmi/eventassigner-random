import { AssignmentElement } from './typings/assignment';
import { ListElement } from './typings/list';

export function scoreAssignment(assignment: AssignmentElement[], list: ListElement[]): number {
	let result = 0;
	for (const a of assignment) {
		if (a.assignment === -1) {
			continue;
		}
		const listele = list.find((ele) => ele.id === a.id && ele.event === a.assignment);
		if (typeof listele !== 'undefined') {
			result = result + listele.gain;
		}
	}
	return result;
}
