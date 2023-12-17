export interface User {
	id: number;
	profile_id: number;
	name: string;
	email: string;
	phone_number: string;
}

export interface Profiles {
	id: number;
	isAdmin: boolean;
}
