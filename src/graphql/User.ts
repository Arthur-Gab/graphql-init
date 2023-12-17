import { users, profiles } from '../db/dummy_data';
import { User } from '../types';

export const userTypeDefs = /* GraphQL */ `
	type User {
		id: Int
		name: String
		email: String
		phone_number: String
		profile: Profile
	}

	type Query {
		user(id: Int, name: String): User
		users: [User]!
	}
`;

export const userResolvers = {
	User: {
		profile: (user: User) =>
			profiles.find((profile) => profile.id == user.profile_id),
	},
	Query: {
		user: (_: any, { id, name }: User) =>
			id !== undefined
				? users.find((user) => user.id === id)
				: users.find((user) => user.name === name),
		users: () => users,
	},
};
