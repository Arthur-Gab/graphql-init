import { users, profiles } from '../db/dummy_data';
import { User } from '../types';
import { generateNextIdFromArray } from './util';
import { GraphQLError } from 'graphql';

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

	type Mutation {
		createUser(name: String!, email: String!, phone_number: String!): User!
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
	Mutation: {
		createUser(_: any, args: User) {
			const { email } = args;

			const userAlredyExist = users.some((user) => user.email === email);

			if (userAlredyExist) {
				throw new GraphQLError(
					`User '${args.name}' alredy exist on data base`,
					{
						extensions: {
							code: 'USER_ALREDY_EXIST',
						},
					}
				);
			}

			const newUser = {
				...args,
				id: generateNextIdFromArray(users),
				profile_id: generateNextIdFromArray(profiles),
			};

			users.push(newUser);

			return newUser;
		},
	},
};
