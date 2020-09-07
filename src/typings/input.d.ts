import { Group } from './group';
import { Event } from './event';
import { ListElement } from './list';

export interface Input {
	groups: Group[];
	events: Event[];
	L: ListElement[];
}
