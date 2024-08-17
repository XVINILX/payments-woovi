import { GraphQLResolveInfo } from "graphql";
import { UsersService } from "../application/services/userService";
import { UsersRepository } from "../database/repositories/UserRepository";

const userService = new UsersService(new UsersRepository());

export const withAuth = (resolver: any, requiredRoles: string[] = []) => {
  return async (
    parent: any,
    args: any,
    context: any,
    info: GraphQLResolveInfo
  ) => {
    if (!context.state.user) {
      throw new Error("Unauthorized");
    }

    if (
      requiredRoles.length &&
      !requiredRoles.includes(context.state.user.role)
    ) {
      throw new Error("Forbidden");
    }

    const user = await userService.getUserById(context.state.user.sub);

    if (user) context.state.userInfo = user;

    return resolver(parent, args, context, info);
  };
};
