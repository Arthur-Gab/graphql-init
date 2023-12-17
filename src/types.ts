export interface User {
	ID: Number;
	profile_ID: Number;
	name: String;
	email: String;
	phone_number: String;
}

export interface Profiles {
	ID: Number;
	isAdmin: Boolean;
}
