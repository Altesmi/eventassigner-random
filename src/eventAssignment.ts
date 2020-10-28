import { checkInput } from './checkInput';
import { randomAssignment } from './randomAssignment';
import { scoreAssignment } from './scoreAssignment';
import { checkAssignment } from './checkAssignment';
import { AssignmentElement } from './typings/assignment';
import { CheckResult } from './typings/checkResult';
import { Input } from './typings/input';

export function eventAssignment(input: Input): AssignmentElement[] | CheckResult {
	const inputCheck = checkInput(input);

	if (inputCheck.value === 0) {
		return inputCheck;
	}

	let bestAssignment = randomAssignment(input);
	let bestScore = scoreAssignment(bestAssignment, input.L);
	for (let i = 1; i < input.assignmentRounds; i++) {
		const newAssignment = randomAssignment(input);
		const newScore = scoreAssignment(newAssignment, input.L);
		if (newScore > bestScore) {
			bestScore = newScore;
			bestAssignment = newAssignment;
		}
	}
	const assignmentCheck = checkAssignment(bestAssignment, input.events, input.groups);

	if (assignmentCheck.value === 0) {
		return assignmentCheck;
	} else {
		return bestAssignment;
	}
}
