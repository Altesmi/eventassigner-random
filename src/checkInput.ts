import { Input } from './typings/input';
import { CheckResult } from './typings/checkResult';
import { id } from './typings/id';

export function checkInput(input: Input): CheckResult {
	const result: CheckResult = { value: 0, msg: '' };
	if (typeof input.events === 'undefined') {
		result.msg = 'Input has no events array';
		return result;
	}
	// Check that events have min, max
	for (let eventId = 0; eventId < input.events.length; eventId += 1) {
		if (
			typeof input.events[eventId].min === 'undefined' ||
			typeof input.events[eventId].max === 'undefined' ||
			typeof input.events[eventId].id === 'undefined'
		) {
			result.msg = `event in index ${eventId} is missing min, max and/or id`;
			return result;
		}
	}

	// Check that events have unique ids
	const eventIds: id[] = [];
	for (let eventId = 0; eventId < input.events.length; eventId += 1) {
		if (eventIds.includes(input.events[eventId].id)) {
			result.msg = `Event ids are not unique. First duplicate id found in index ${eventId}`;
			return result;
		}
		eventIds.push(input.events[eventId].id);
	}

	if (typeof input.groups === 'undefined') {
		result.msg = 'Input has no groups array';
		return result;
	}

	// Check that groups have unique ids
	const groupIds: id[] = [];
	for (let groupId = 0; groupId < input.groups.length; groupId += 1) {
		if (groupIds.includes(input.groups[groupId].id)) {
			result.msg = `Group ids are not unique. First duplicate id found in index ${groupId}`;
			return result;
		}
		groupIds.push(input.groups[groupId].id);
	}

	// Check that every group has a preferences and size

	for (let groupId = 0; groupId < input.groups.length; groupId += 1) {
		if (typeof input.groups[groupId].size !== 'number' || typeof input.groups[groupId].pref === 'undefined') {
			result.msg = `Group in index ${groupId} is missing either size or preference array`;
			return result;
		}
		if (input.groups[groupId].pref.constructor !== Array) {
			result.msg = `The preference of group in index ${groupId} is not an array`;
			return result;
		}
		// Check that every preference maps to event id
		for (let prefId = 0; prefId < input.groups[groupId].pref.length; prefId += 1) {
			if (!eventIds.includes(input.groups[groupId].pref[prefId])) {
				result.msg = `The preference in index ${prefId} of group in index ${groupId} does not map into a correct event id`;
				return result;
			}
		}
	}

	// check that L (list) exists
	if (typeof input.L === 'undefined') {
		result.msg = `input has no L (list)`;
		return result;
	}

	// Check that list elements have id, size, event, gain
	for (let ind = 0; ind < input.L.length; ind += 1) {
		if (
			typeof input.L[ind].id === 'undefined' ||
			typeof input.L[ind].size === 'undefined' ||
			typeof input.L[ind].gain === 'undefined'
		) {
			result.msg = `List element in index ${ind} is missing min, id, size or gain`;
			return result;
		}

		// Check that the event field maps to an actual event and that it is included in
		// the groups preferences
		if (input.events.filter((ele) => ele.id === input.L[ind].event).length === 0) {
			result.msg = `event field in List element in index ${ind} does not map to any event in events array`;
			return result;
		}

		const groupInd: number = input.groups.findIndex((ele) => ele.id === input.L[ind].id);

		if (!input.groups[groupInd].pref.includes(input.L[ind].event)) {
			result.msg = `Event field in List element in index ${ind} is not included in the groups preferences`;
		}
	}
	// Check that updateL exists
	if (typeof input.updateL !== 'function') {
		result.msg = `Input has no updateL function`;
		return result;
	}

	// everything is ok
	result.value = 1;
	result.msg = `Input ok`;
	return result;
}
