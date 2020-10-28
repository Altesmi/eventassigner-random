import { countPlayersInEvent } from './countPlayersInEvent';
import { AssignmentElement } from './typings/assignment';
import { Group, AssignedGroup } from './typings/group';
import { Event } from './typings/event';
import { CheckResult } from './typings/checkResult';

export function checkAssignment(assignment: AssignmentElement[], events: Event[], groups: Group[]): CheckResult {
	// checks if the assignment is a valid one
	const result: CheckResult = {
		value: 1,
		msg: '',
	};

	events.forEach((e) => {
		let numPlayers: number = 0;
		let groupsAttending: AssignedGroup[] = assignment.filter((a) => a.assignment === e.id);
		if (groupsAttending.length > 0) {
			groupsAttending = groupsAttending.map((gr) => {
				const groupdata = groups.find((g) => g.id === gr.id);
				if (typeof groupdata === 'undefined') {
					result.msg = 'group with assignment not found in groups array';
					return { id: 0, assignment: 0, size: 0 };
				} else {
					return { id: gr.id, assignment: gr.assignment, size: groupdata.size };
				}
			});

			numPlayers = groupsAttending.reduce((total, gr) => {
				if (typeof gr.size !== 'undefined') {
					return total + gr.size;
				} else {
					return total;
				}
			}, 0);
			// check that each event's player count is between min and max
			if (numPlayers < e.min) {
				result.value = 0;
				result.msg = result.msg.concat(`Event in index ${e.id} has lower than minimum number of players;`);
			}
			if (numPlayers > e.max) {
				result.value = 0;
				result.msg = result.msg.concat(`Event in index ${e.id} has more than maximum number of players;`);
			}
		}
	});
	if (result.value === 0) {
		return result;
	}
	// Check that groups that are not assigned to any event do not fit to any of their preferences

	groups.forEach((g) => {
		g.pref.forEach((gPref) => {
			const eInd = events.findIndex((e) => e.id === gPref);
			const numPlayers = countPlayersInEvent(groups, events, gPref);
			const assignmentInd = assignment.findIndex((ele) => ele.id === g.id);
			if (assignment[assignmentInd].assignment === -1) {
				if (numPlayers + g.size < events[eInd].max || g.size >= events[eInd].min) {
					result.value = 0;
					result.msg = result.msg.concat(`Group ${g.id} could fit to pref ${gPref};`);
				}
			}
		});
	});

	return result;
}
