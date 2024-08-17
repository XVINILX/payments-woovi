import { Context } from "koa";
import { AccountsService } from "../../../application/services/accountService";
import { withAuth } from "../../../middleware/withAuth";
import { AccountsRepository } from "../../../database/repositories/AccountRepository";
import { UsersService } from "../../../application/services/userService";
import { UsersRepository } from "../../../database/repositories/UserRepository";

const accountsService = new AccountsService(
  new AccountsRepository(),
  new UsersService(new UsersRepository())
);

export const accountResolvers = {
  Query: {
    getAccountById: async (_: any, { id }: { id: string }) => {
      return accountsService.getAccountById(id);
    },
    getAccountsByUserId: async (_: any, { userId }: { userId: string }) => {
      return accountsService.getAccountsByUserId(userId);
    },
  },
  Mutation: {
    createAccount: withAuth(
      async (_: any, { name }: { name: string }, context: Context) => {
        const userId = context.state.userInfo._id;

        return accountsService.createAccount(
          {
            name,
            balance: 0,
            userId: userId,
          },
          context.state.userInfo
        );
      }
    ),
    updateAccount: async (
      _: any,
      { id, name, balance }: { id: string; name?: string; balance?: number }
    ) => {
      return accountsService.updateAccount(id, { name, balance });
    },
    deleteAccount: async (_: any, { id }: { id: string }) => {
      return accountsService.deleteAccount(id);
    },
  },
};
