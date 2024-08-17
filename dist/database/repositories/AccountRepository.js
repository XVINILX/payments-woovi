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
exports.AccountsRepository = void 0;
const AccountModel_1 = require("../models/AccountModel");
class AccountsRepository {
    getById(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return AccountModel_1.AccountModel.findById(accountId).populate("transactions").exec();
        });
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return AccountModel_1.AccountModel.find({ user: userId }).populate("transactions").exec();
        });
    }
    create(accountData) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = new AccountModel_1.AccountModel(accountData);
            return account.save();
        });
    }
    update(accountId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return AccountModel_1.AccountModel.findByIdAndUpdate(accountId, updateData, {
                new: true,
            }).exec();
        });
    }
    delete(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return AccountModel_1.AccountModel.findByIdAndDelete(accountId).exec();
        });
    }
}
exports.AccountsRepository = AccountsRepository;
