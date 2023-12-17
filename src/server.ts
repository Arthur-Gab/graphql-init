import { createSchema, createYoga } from 'graphql-yoga';
import { products, users } from './dummy_data';

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
		getUserByIdOrName(id: Int, name: String): User!
		getUsers: [User!]!
		getProducts: [Product!]!
		getProductByIdOrName(id: Int, name: String): Product
	}
`;

const resolvers = {
	Query: {
		getUserByIdOrName: (_: any, args: { id: Number; name: String }) =>
			args.id !== undefined
				? users.find((user) => user.id === args.id)
				: users.find((user) => user.name === args.name),
		getUsers: () => users,
		getProducts: () => products,
		getProductByIdOrName: (_: any, args: { id: Number; name: String }) =>
			args.id !== undefined
				? products.find((product) => product.id === args.id)
				: products.find((product) => product.name === args.name),
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
