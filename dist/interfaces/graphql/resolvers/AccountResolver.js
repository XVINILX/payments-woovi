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
exports.accountResolvers = void 0;
const accountService_1 = require("../../../application/services/accountService");
const withAuth_1 = require("../../../middleware/withAuth");
const accountsService = new accountService_1.AccountsService();
exports.accountResolvers = {
    Query: {
        getAccountById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return accountsService.getAccountById(id);
        }),
        getAccountsByUserId: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            return accountsService.getAccountsByUserId(userId);
        }),
    },
    Mutation: {
        createAccount: (0, withAuth_1.withAuth)((_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { name, balance }, context) {
            const userId = context.state.userInfo.id;
            return accountsService.createAccount({ name, balance, user: userId });
        })),
        updateAccount: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, name, balance }) {
            return accountsService.updateAccount(id, { name, balance });
        }),
        deleteAccount: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return accountsService.deleteAccount(id);
        }),
    },
};
