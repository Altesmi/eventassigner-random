import { id } from './id';
export interface Event {
	id: number | string;
	min: number;
	max: number;
	groups: id[];
}
