import { profiles } from '../db/dummy_data';
import { Profiles } from './util/types';

export const profileTypeDefs = /* GraphQL */ `
	type Profile {
		id: Int
		isAdmin: Boolean
	}
	type Query {
		profile(id: Int): Profile!
	}
`;

export const profileResolvers = {
	Query: {
		profile: (_: any, args: Profiles) =>
			profiles.find((profile) => profile.id === args.id),
	},
};
