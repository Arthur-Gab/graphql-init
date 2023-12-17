import { createSchema, createYoga } from 'graphql-yoga';

const port = process.env.API_PORT || 4000;

const typeDefs = /* GraphQL */ `
	type Query {
		grettings: String
	}
`;

const resolvers = {
	Query: {
		grettings: () => 'Hello from Yoga in a Bun app!',
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
