import { id } from './id';

export interface Group {
	id: id;
	size: number;
	pref: id[];
}

export interface AssignedGroup {
	id: id;
	size?: number;
	assignment: id;
}
