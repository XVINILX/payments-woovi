import { accountResolvers } from "./resolvers/AccountResolver";
import { authResolvers } from "./resolvers/authResolvers";
import { transactionResolvers } from "./resolvers/transactionsResolvers";
import { userResolvers } from "./resolvers/userResolvers";

export const resolvers = {
  Query: {
    ...accountResolvers.Query,
    ...userResolvers.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...accountResolvers.Mutation,
    ...userResolvers.Mutation,
    ...authResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
};
