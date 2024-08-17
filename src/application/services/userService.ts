import { IUserModel } from "../../database/models/UserModel";
import { UsersRepository } from "../../database/repositories/UserRepository";

export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<IUserModel | null> {
    return this.usersRepository.getById(userId);
  }

  async getUserByEmail(email: string): Promise<IUserModel | null> {
    return this.usersRepository.getByEmail(email);
  }

  async updateUser(
    userId: string,
    updateData: Partial<IUserModel>
  ): Promise<IUserModel | null> {
    return this.usersRepository.update(userId, updateData);
  }

  async deleteUser(userId: string): Promise<IUserModel | null> {
    return this.usersRepository.delete(userId);
  }
}
