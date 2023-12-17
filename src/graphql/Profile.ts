import { profiles } from '../db/dummy_data';
import { Profiles } from '../types';

export const profileTypeDefs = /* GraphQL */ `
	type Profile {
		ID: Int
		isAdmin: Boolean
	}
	type Query {
		profile(ID: Int): Profile!
	}
`;

export const profileResolvers = {
	Query: {
		profile: (_: any, args: Profiles) =>
			profiles.find((profile) => profile.ID === args.ID),
	},
};
