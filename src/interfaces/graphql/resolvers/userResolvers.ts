import { AuthService } from "../../../application/services/authService";
import { UsersService } from "../../../application/services/userService";
import { UsersRepository } from "../../../database/repositories/UserRepository";

const usersService = new UsersService(new UsersRepository());

const authService = new AuthService(new UsersRepository());

export const userResolvers = {
  User: {
    password: () => null,
  },
  Query: {
    getUserById: async (_: any, { id }: { id: string }) => {
      return usersService.getUserById(id);
    },
    getUserByEmail: async (_: any, { email }: { email: string }) => {
      return usersService.getUserByEmail(email);
    },
  },
  Mutation: {
    updateUser: async (
      _: any,
      {
        id,
        name,
        email,
        password,
      }: { id: string; name?: string; email?: string; password?: string }
    ) => {
      return usersService.updateUser(id, { name, email, password });
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      return usersService.deleteUser(id);
    },
  },
};
