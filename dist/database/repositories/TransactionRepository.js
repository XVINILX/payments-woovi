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
exports.TransactionsRepository = void 0;
const TransactionsModel_1 = require("../models/TransactionsModel");
class TransactionsRepository {
    getById(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return TransactionsModel_1.TransactionsModel.findById(transactionId).exec();
        });
    }
    getByAccountId(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return TransactionsModel_1.TransactionsModel.find({ account: accountId }).exec();
        });
    }
    create(transactionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = new TransactionsModel_1.TransactionsModel(transactionData);
            return transaction.save();
        });
    }
    update(transactionId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return TransactionsModel_1.TransactionsModel.findByIdAndUpdate(transactionId, updateData, {
                new: true,
            }).exec();
        });
    }
    delete(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return TransactionsModel_1.TransactionsModel.findByIdAndDelete(transactionId).exec();
        });
    }
}
exports.TransactionsRepository = TransactionsRepository;
