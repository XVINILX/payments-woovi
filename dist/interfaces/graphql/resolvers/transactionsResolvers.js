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
exports.transactionResolvers = void 0;
const transactionService_1 = require("../../../application/services/transactionService");
const transactionsService = new transactionService_1.TransactionsService();
exports.transactionResolvers = {
    Query: {
        getTransactionById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return transactionsService.getTransactionById(id);
        }),
    },
    Mutation: {
        createTransaction: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { payeer, payee, value, account, }) {
            return transactionsService.createTransaction({
                payeer,
                payee,
                value,
                account,
            });
        }),
        updateTransaction: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, payeer, payee, value, }) {
            return transactionsService.updateTransaction(id, {
                payeer,
                payee,
                value,
            });
        }),
        deleteTransaction: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return transactionsService.deleteTransaction(id);
        }),
    },
};
