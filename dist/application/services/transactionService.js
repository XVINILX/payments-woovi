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
exports.TransactionsService = void 0;
const TransactionRepository_1 = require("../../database/repositories/TransactionRepository");
class TransactionsService {
    constructor() {
        this.transactionsRepository = new TransactionRepository_1.TransactionsRepository();
    }
    getTransactionById(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.transactionsRepository.getById(transactionId);
        });
    }
    getTransactionsByAccountId(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.transactionsRepository.getByAccountId(accountId);
        });
    }
    createTransaction(transactionData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.transactionsRepository.create(transactionData);
        });
    }
    updateTransaction(transactionId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.transactionsRepository.update(transactionId, updateData);
        });
    }
    deleteTransaction(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add any business logic or validation here
            return this.transactionsRepository.delete(transactionId);
        });
    }
}
exports.TransactionsService = TransactionsService;
