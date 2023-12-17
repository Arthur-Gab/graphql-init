import { Profiles, User } from '../types';

export const generateNextIdFromArray = (
	array: Array<User | Profiles>
): number => {
	return Math.max(...array.map((element) => element.id), 0) + 1;
};
