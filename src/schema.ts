import { makeExecutableSchema } from '@graphql-tools/schema';

import { userTypeDefs, userResolvers } from './graphql/User';
import { profileTypeDefs, profileResolvers } from './graphql/Profile';

export const schema = makeExecutableSchema({
	typeDefs: [userTypeDefs, profileTypeDefs],
	resolvers: [userResolvers, profileResolvers],
});
