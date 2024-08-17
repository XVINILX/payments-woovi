"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const authService_1 = require("../../../application/services/authService");
const userService_1 = require("../../../application/services/userService");
const UserRepository_1 = require("../../../database/repositories/UserRepository");
const usersService = new userService_1.UsersService(new UserRepository_1.UsersRepository());
const authService = new authService_1.AuthService(new UserRepository_1.UsersRepository());
exports.userResolvers = {
    Query: {
        getUserById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return usersService.getUserById(id);
        }),
        getUserByEmail: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email }) {
            return usersService.getUserByEmail(email);
        }),
    },
    Mutation: {
        createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { name, email, password, }) {
            return authService.createUser({ name, email, password });
        }),
        updateUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, name, email, password, }) {
            return usersService.updateUser(id, { name, email, password });
        }),
        loginUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password }) {
            return authService.login(email, password);
        }),
        deleteUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return usersService.deleteUser(id);
        }),
    },
};
