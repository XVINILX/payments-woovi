import Koa from "koa";
import { AuthService } from "../application/services/authService";
import { UsersRepository } from "../database/repositories/UserRepository";

export const authMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  const authHeader = ctx.request.headers.authorization || "";
  const authService = new AuthService(new UsersRepository());
  try {
    if (authHeader) {
      const decodedUser = await authService.decodeToken(authHeader);
      if (decodedUser) ctx.state.user = decodedUser;
    }
  } catch (error) {
    ctx.state.user = null;
  }

  await next();
};
