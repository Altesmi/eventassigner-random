import { Group } from './typings/group';
import { Event } from './typings/event';
import { id } from './typings/id';

function countPlayersInEvent(groups: Group[], events: Event[], eventId: id): number {
	const eInd: number = events.findIndex((e) => e.id === eventId);
	// return 0 if there are no groups in the event
	if (events[eInd].groups.length === 0) {
		return 0;
	}
	// sum up the individual group sizes
	const playerCount: number = events[eInd].groups.reduce(
		(total: number, id: id) => total + groups.filter((g) => g.id === id)[0].size,
		0,
	);

	return playerCount;
}

module.exports = { countPlayersInEvent };
