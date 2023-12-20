import { users, profiles } from '../db/dummy_data';
import { User } from './util/types';
import { generateNextIdFromArray } from './util/util';
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

	input UserInput {
		name: String!
		email: String!
		phone_number: String!
	}

	type Mutation {
		createUser(data: UserInput!): User!
		updateUser(id: Int!, data: UserInput): User!
		deleteUser(id: Int!): Boolean
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
		createUser: (_: any, { data }: { data: User }) => {
			const { email } = data;

			const userAlredyExist = users.some((user) => user.email === email);

			if (userAlredyExist) {
				throw new GraphQLError(
					`User '${data.name}' alredy exist on data base`,
					{
						extensions: {
							code: 'USER_ALREDY_EXIST',
						},
					}
				);
			}

			const newUser = {
				...data,
				id: generateNextIdFromArray(users),
				profile_id: generateNextIdFromArray(profiles),
			};

			users.push(newUser);

			return newUser;
		},
		updateUserById: (_: any, { id, data }: { id: number; data: User }) => {
			const userIndex = users.findIndex((user) => user.id === id);

			if (userIndex === -1) {
				throw new GraphQLError(
					`User '${data.name}' hasn't be created yet`,
					{
						extensions: {
							code: 'USER_DONT_EXIST',
						},
					}
				);
			}

			users[userIndex] = {
				...users[userIndex],
				...data,
			};

			return users[userIndex];
		},
		deleteUserByID: (_: any, { id }: { id: number }) => {
			const lengthBeforeDelete = users.length;
			users.filter((user) => user.id !== id);

			return lengthBeforeDelete > users.length ? true : false;
		},
	},
};
