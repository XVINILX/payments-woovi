import { ITransactionsModel } from "../../database/models/TransactionsModel";
import { TransactionsRepository } from "../../database/repositories/TransactionRepository";

export class TransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor() {
    this.transactionsRepository = new TransactionsRepository();
  }

  async getTransactionById(
    transactionId: string
  ): Promise<ITransactionsModel | null> {
    return this.transactionsRepository.getById(transactionId);
  }

  async getTransactionsByAccountId(
    accountId: string
  ): Promise<ITransactionsModel[]> {
    return this.transactionsRepository.getByAccountId(accountId);
  }

  async createTransaction(
    transactionData: Partial<ITransactionsModel>
  ): Promise<ITransactionsModel> {
    //TODO gets the account from user

    //TODO check if user account has enough balance

    // if so, pass the value to the payee, also adds value for him

    // decrease the value for user making the transaction

    // create the transaction

    return this.transactionsRepository.create(transactionData);
  }

  async updateTransaction(
    transactionId: string,
    updateData: Partial<ITransactionsModel>
  ): Promise<ITransactionsModel | null> {
    return this.transactionsRepository.update(transactionId, updateData);
  }

  async deleteTransaction(
    transactionId: string
  ): Promise<ITransactionsModel | null> {
    // Add any business logic or validation here
    return this.transactionsRepository.delete(transactionId);
  }
}
