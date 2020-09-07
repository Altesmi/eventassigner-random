import { id } from './id';

export interface Group {
	id: id;
	size: number;
	pref: number[] | string[];
}
