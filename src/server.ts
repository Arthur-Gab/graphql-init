import { createSchema, createYoga } from 'graphql-yoga';
// import { products, users } from './dummy_data';
interface User {
	ID: Number;
	profile_ID: Number;
	name: String;
	email: String;
	phone_number: String;
}

interface Profiles {
	ID: Number;
	isAdmin: Boolean;
}

const { users, profiles } = {
	users: [
		{
			ID: 0,
			profile_ID: 0,
			name: 'Arthur Gabriel',
			email: 'someemail@gmail.com',
			phone_number: '0000-0000',
		},
		{
			ID: 1,
			profile_ID: 1,
			name: 'Rafaela Fernandes',
			email: 'anotheremail@gmail.com',
			phone_number: '1111-1111',
		},
	],
	profiles: [
		{ ID: 0, isAdmin: true },
		{ ID: 1, isAdmin: false },
	],
};

const typeDefs = /* GraphQL */ `
	type User {
		ID: Int
		name: String
		email: String
		phone_number: String
		profile: Profile
	}

	type Profile {
		ID: Int
		isAdmin: Boolean
	}

	type Query {
		user(ID: Int): User!
		profile(ID: Int): Profile!
	}
`;

const resolvers = {
	User: {
		profile: (user: User) =>
			profiles.find((profile) => profile.ID == user.profile_ID),
	},
	Query: {
		user: (_: any, args: User) => users.find((user) => user.ID === args.ID),
		profile: (_: any, args: Profiles) =>
			profiles.find((profile) => profile.ID === args.ID),
	},
};

const yoga = createYoga({
	schema: createSchema({
		typeDefs,
		resolvers,
	}),
});

const port = process.env.API_PORT || 4000;

const server = Bun.serve({
	fetch: yoga,
	port,
});

console.info(
	`Server is running on ${new URL(
		yoga.graphqlEndpoint,
		`http://${server.hostname}:${server.port}`
	)}`
);
