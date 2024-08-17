import { IAccountModel } from "../../database/models/AccountModel";
import { IUserModel } from "../../database/models/UserModel";
import { AccountsRepository } from "../../database/repositories/AccountRepository";
import { CreateAccountDTO } from "../../domain/dtos/accountDTOs";
import { UsersService } from "./userService";

export class AccountsService {
  constructor(
    private accountsRepository: AccountsRepository,
    private readonly userService: UsersService
  ) {}

  async getAccountById(accountId: string): Promise<IAccountModel | null> {
    return this.accountsRepository.getById(accountId);
  }

  async getAccountsByUserId(userId: string): Promise<IAccountModel[]> {
    return this.accountsRepository.getByUserId(userId);
  }

  async createAccount(
    accountData: CreateAccountDTO,
    user: IUserModel
  ): Promise<IAccountModel | undefined> {
    if (accountData.userId) {
      if (user && user._id) {
        return await this.accountsRepository.create({
          user: user._id.toString(),
          balance: 0,
          name: accountData.name,
        });
      }
    }
  }

  async updateAccount(
    accountId: string,
    updateData: Partial<IAccountModel>
  ): Promise<IAccountModel | null> {
    // Add any business logic or validation here
    return this.accountsRepository.update(accountId, updateData);
  }

  async deleteAccount(accountId: string): Promise<IAccountModel | null> {
    // Add any business logic or validation here
    return this.accountsRepository.delete(accountId);
  }
}
