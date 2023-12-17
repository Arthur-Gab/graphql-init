import { users, profiles } from '../db/dummy_data';
import { User } from '../types';

export const userTypeDefs = /* GraphQL */ `
	type User {
		ID: Int
		name: String
		email: String
		phone_number: String
		profile: Profile
	}

	type Query {
		user(ID: Int): User!
	}
`;

export const userResolvers = {
	User: {
		profile: (user: User) =>
			profiles.find((profile) => profile.ID == user.profile_ID),
	},
	Query: {
		user: (_: any, args: User) => users.find((user) => user.ID === args.ID),
	},
};
