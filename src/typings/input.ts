import { Group } from './group';
import { Event } from './event';
import { ListElement } from './list';
import { id } from './id';
import { AssignmentElement } from './assignment';

export interface Input {
	groups: Group[];
	events: Event[];
	L: ListElement[];
	updateL: (input: updateLInput) => ListElement[];
	assignmentRounds: number;
}

export interface updateLInput {
	groups: Group[];
	events: Event[];
	assignment: AssignmentElement[];
	unassignedGroups: Group[];
	L: ListElement[];
	groupId: id;
}

export interface GroupAndEventData {
	groups: Group[];
	events: Event[];
}
