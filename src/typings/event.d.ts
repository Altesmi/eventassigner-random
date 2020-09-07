import { id } from './id';
export interface Event {
	id: id;
	min: number;
	max: number;
	groups: id[];
}
