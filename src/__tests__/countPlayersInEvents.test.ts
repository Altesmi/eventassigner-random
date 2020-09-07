import { countPlayersInEvent } from '../countPlayersInEvent';
import { mockData } from '../__data__/mockData';
import { Group } from '../typings/group';
import { Event } from '../typings/event';

const groups: Group[] = mockData.groups;
const events: Event[] = mockData.events;

describe('countPlayersInEvents', () => {
	it('should return -1 if the event index is not found', () => {
		const result = countPlayersInEvent(groups, events, 0);
		expect(result).toEqual(-1);
	});
	it('should return the number of players in an event', () => {
		// place group 1 to event 1
		events[0].groups.push(groups[0].id);
		const result = countPlayersInEvent(groups, events, 1);
		expect(result).toEqual(2);
	});
	it('should return 0 if there are no groups in the event.groups array', () => {
		const result = countPlayersInEvent(groups, events, 2);
		expect(result).toEqual(0);
	});
});
