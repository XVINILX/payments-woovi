import {
  TransactionsModel,
  ITransactionsModel,
} from "../models/TransactionsModel";
import { ObjectId } from "mongoose";

export class TransactionsRepository {
  async getById(transactionId: string): Promise<ITransactionsModel | null> {
    return TransactionsModel.findById(transactionId).exec();
  }

  async getByAccountId(accountId: string): Promise<ITransactionsModel[]> {
    return TransactionsModel.find({ account: accountId }).exec();
  }

  async create(
    transactionData: Partial<ITransactionsModel>
  ): Promise<ITransactionsModel> {
    const transaction = new TransactionsModel(transactionData);
    return transaction.save();
  }

  async update(
    transactionId: string,
    updateData: Partial<ITransactionsModel>
  ): Promise<ITransactionsModel | null> {
    return TransactionsModel.findByIdAndUpdate(transactionId, updateData, {
      new: true,
    }).exec();
  }

  async delete(transactionId: string): Promise<ITransactionsModel | null> {
    return TransactionsModel.findByIdAndDelete(transactionId).exec();
  }
}
