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

	let bestScore = -100;
	let bestAssignment;
	for (let i = 0; i < input.assignmentRounds; i++) {
		const newAssignment = randomAssignment(input);
		const assignmentCheck = checkAssignment(newAssignment, input.events, input.groups);

		if (assignmentCheck.value === 0) {
			continue;
		} else {
			const newScore = scoreAssignment(newAssignment, input.L);

			if (newScore > bestScore) {
				bestScore = newScore;
				bestAssignment = newAssignment;
			}
		}
	}

	// check assignment again if the current assignment is the first assignment before the loop
	if (bestAssignment == null) {
		return {
			value: 0,
			msg: 'No valid assignment',
		};
	} else {
		const assignmentCheck = checkAssignment(bestAssignment, input.events, input.groups);
		if (assignmentCheck.value === 0) {
			return assignmentCheck;
		} else {
			return bestAssignment;
		}
	}
}
