export interface User {
	id: Number;
	profile_id: Number;
	name: String;
	email: String;
	phone_number: String;
}

export interface Profiles {
	id: Number;
	isAdmin: Boolean;
}
