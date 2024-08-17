import { UserModel, IUserModel } from "../models/UserModel";

export class UsersRepository {
  async getById(userId: string): Promise<IUserModel | null> {
    return await UserModel.findById(userId).populate("account").lean().exec();
  }

  async getByEmail(email: string): Promise<IUserModel | null> {
    const userDocument = await UserModel.findOne({ email })
      .populate("account")
      .lean()
      .exec();

    return userDocument;
  }

  async create(userData: Partial<IUserModel>): Promise<IUserModel> {
    const user = new UserModel(userData);
    return user.save();
  }

  async update(
    userId: string,
    updateData: Partial<IUserModel>
  ): Promise<IUserModel | null> {
    return UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).exec();
  }

  async delete(userId: string): Promise<IUserModel | null> {
    return UserModel.findByIdAndDelete(userId).exec();
  }
}
