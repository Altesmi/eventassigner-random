import { AssignmentElement } from './typings/assignment';
import { Input } from './typings/input';
import { Event } from './typings/event';
import { Group } from './typings/group';

export function randomAssignment(input: Input): AssignmentElement[] {
	const assignment: AssignmentElement[] = input.groups.map((ele) => {
		return { id: ele.id, assignment: -1 };
	});

	const eventsCopy: Event[] = shuffleArray(JSON.parse(JSON.stringify(input.events)));

	let groupsCopy: Group[] = JSON.parse(JSON.stringify(input.groups));

	for (const event of eventsCopy) {
		let groupsToThisEvent: Group[] = [];

		for (const group of groupsCopy) {
			if (group.pref.includes(event.id)) {
				groupsToThisEvent.push(group);
			}
		}
		const totalNumPlayers: number = groupsToThisEvent.reduce((total, ele) => {
			return total + ele.size;
		}, 0);

		if (totalNumPlayers < event.min) {
			continue;
		}
		let numPlayers = 0;
		const assignedGroups: Group[] = [];
		const maxLoops = 10;
		let numLoops = 0;

		while (numPlayers <= event.max) {
			const randomInd = Math.round(Math.random() * (groupsToThisEvent.length - 1));
			if (groupsToThisEvent[randomInd].size + numPlayers <= event.max) {
				assignedGroups.push(groupsToThisEvent[randomInd]);
				numPlayers = numPlayers + groupsToThisEvent[randomInd].size;
				groupsToThisEvent = groupsToThisEvent.filter((ele) => ele.id !== groupsToThisEvent[randomInd].id);
			} else {
				numLoops = numLoops + 1;
			}
			if (numLoops > maxLoops || groupsToThisEvent.length < 1) {
				break;
			}
		}

		if (numPlayers >= event.min) {
			for (const group of assignedGroups) {
				const assignmentInd = assignment.findIndex((ele) => ele.id === group.id);
				assignment[assignmentInd].assignment = event.id;
				// remove group from the groupscopy
				groupsCopy = groupsCopy.filter((ele) => ele.id !== group.id);
			}
		}
	}

	return assignment;
}

const shuffleArray = <T>(array: T[]): T[] => {
	// create copy of array
	const resultArray = JSON.parse(JSON.stringify(array));

	return resultArray.sort(() => Math.random() < 0.5);
};
