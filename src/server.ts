import { createSchema, createYoga } from 'graphql-yoga';

const port = process.env.API_PORT || 4000;

/*
 * Int
 * Float
 * String
 * Boolean
 * ID
 */

const typeDefs = /* GraphQL */ `
	type Product {
		id: ID!
		name: String!
		price: Float!
	}

	type User {
		id: ID!
		name: String!
		age: Int!
		salary: Float!
		isActive: Boolean!
		techs: [String!]!
	}

	type Query {
		users: [User!]!
		products: [Product!]!
	}
`;

const resolvers = {
	Query: {
		users: () => [
			{
				id: 0,
				name: 'Arthur Gabriel',
				age: 20,
				salary: 1200.99,
				isActive: true,
				techs: ['TypeScript', 'NextJs', 'GraphQL', 'RESTfull API'],
			},
			{
				id: 1,
				name: 'Rafaela Clara',
				age: 16,
				salary: 700.0,
				isActive: true,
				techs: ['Proggraming Logic', 'Portugol'],
			},
		],
		products: () => [
			{
				id: 0,
				name: 'Logitech MX Mini',
				price: 980.99,
			},
			{
				id: 1,
				name: 'Logitech LightSpeed G309',
				price: 320.0,
			},
		],
	},
};

const yoga = createYoga({
	schema: createSchema({
		typeDefs,
		resolvers,
	}),
});

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
