import jwt from "jsonwebtoken";
import { Users } from "../../domain/entities/Users";
import { AdminLoginDTO, CreateUserDTO } from "../../domain/dtos/authDto";
import { comparePassword } from "../../utils/comparePass";
import hashPassword from "../../utils/hashPassword";
import { generateRandomPassword } from "../../utils/generateRandomPassort";
import { UsersRepository } from "../../database/repositories/UserRepository";
import { IUserModel } from "../../database/models/UserModel";

export class AuthService {
  constructor(public readonly userRepository: UsersRepository) {}
  private SECRETKEY = process.env.SECRETKEY ?? "";

  async createToken(user: IUserModel) {
    const SECRET_KEY = process.env.SECRETKEY ?? "";

    return {
      access_token: jwt.sign({ sub: user._id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      }),
    };
  }

  async checkToken(token: string): Promise<IUserModel | null> {
    try {
      const finalToken = token.startsWith("Bearer ") ? token.slice(7) : token;

      const decoded = jwt.verify(finalToken, this.SECRETKEY) as jwt.JwtPayload;

      const userId = decoded.sub;

      if (userId) {
        const userExists = await this.userRepository.getById(userId);
        return userExists ? userExists : null;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  async decodeToken(token: string): Promise<any | null> {
    try {
      const finalToken = token.startsWith("Bearer ") ? token.slice(7) : token;

      const decoded = jwt.verify(finalToken, this.SECRETKEY) as jwt.JwtPayload;

      return decoded;
    } catch (error) {
      return null;
    }
  }

  async refreshToken(token: string): Promise<AdminLoginDTO | null> {
    const user = await this.checkToken(token);

    if (user) {
      const newToken = await this.createToken(user);
      return <AdminLoginDTO>{
        id: user.id,
        email: user.email,
        token: newToken.access_token,
      };
    }

    return null;
  }

  async login(email: string, password: string): Promise<AdminLoginDTO | null> {
    const user = await this.userRepository.getByEmail(email);
    if (user && user.password) {
      const comparePass = await comparePassword(password, user.password);

      if (comparePass) {
        const jwtToken = await this.createToken(user);

        return <AdminLoginDTO>{
          email: user.email,
          id: user.id,
          token: jwtToken.access_token,
        };
      }
    }

    return null;
  }

  async createUser(user: CreateUserDTO): Promise<Users | null> {
    const userQuery = await this.userRepository.getByEmail(user.email);
    if (!userQuery) {
      let password = user.password;
      if (password) {
        password = await hashPassword(password);
        user.password = password;
      } else {
        password = generateRandomPassword();
        password = await hashPassword(password);
        user.password = password;
      }
      const newUser = await this.userRepository.create(user);
      return <Users>{
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
    }

    return null;
  }
}
