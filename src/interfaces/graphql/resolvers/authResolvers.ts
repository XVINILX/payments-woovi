import { AuthService } from "../../../application/services/authService";
import { UsersService } from "../../../application/services/userService";
import { UsersRepository } from "../../../database/repositories/UserRepository";

const authService = new AuthService(new UsersRepository());

export const authResolvers = {
  Mutation: {
    createUser: async (
      _: any,
      {
        name,
        email,
        password,
      }: { name: string; email: string; password: string }
    ) => {
      return authService.createUser({ name, email, password });
    },

    loginUser: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const response = await authService.login(email, password);

      if (response)
        return {
          email: response.email,
          id: response.id,
          token: response.token,
        };
    },
  },
};
