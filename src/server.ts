import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

const yoga = createYoga({ schema });

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
