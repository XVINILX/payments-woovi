import { Context } from "koa";
import { TransactionsService } from "../../../application/services/transactionService";
import { withAuth } from "../../../middleware/withAuth";

const transactionsService = new TransactionsService();

export const transactionResolvers = {
  Query: {
    getTransactionById: async (_: any, { id }: { id: string }) => {
      return transactionsService.getTransactionById(id);
    },
  },
  Mutation: {
    createTransaction: withAuth(
      async (
        _: any,
        {
          payeer,
          payee,
          value,
          account,
        }: { payeer: string; payee: string; value: number; account: string },
        context: Context
      ) => {
        const userId = context.state.userInfo._id;

        return transactionsService.createTransaction({
          payeer,
          payee,
          value,
          account,
        });
      }
    ),
    updateTransaction: async (
      _: any,
      {
        id,
        payeer,
        payee,
        value,
      }: { id: string; payeer?: string; payee?: string; value?: number }
    ) => {
      return transactionsService.updateTransaction(id, {
        payeer,
        payee,
        value,
      });
    },
    deleteTransaction: async (_: any, { id }: { id: string }) => {
      return transactionsService.deleteTransaction(id);
    },
  },
};
