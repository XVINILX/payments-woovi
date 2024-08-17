import { AccountModel, IAccountModel } from "../models/AccountModel";

export class AccountsRepository {
  async getById(accountId: string): Promise<IAccountModel | null> {
    return AccountModel.findById(accountId).populate("transactions").exec();
  }

  async getByUserId(userId: string): Promise<IAccountModel[]> {
    return AccountModel.find({ user: userId }).populate("transactions").exec();
  }

  async create(accountData: Partial<IAccountModel>): Promise<IAccountModel> {
    const account = new AccountModel(accountData);
    return await account.save();
  }

  async update(
    accountId: string,
    updateData: Partial<IAccountModel>
  ): Promise<IAccountModel | null> {
    return AccountModel.findByIdAndUpdate(accountId, updateData, {
      new: true,
    }).exec();
  }

  async delete(accountId: string): Promise<IAccountModel | null> {
    return AccountModel.findByIdAndDelete(accountId).exec();
  }
}
