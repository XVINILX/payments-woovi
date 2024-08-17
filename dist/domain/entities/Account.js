"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(id, name, balance, user, transactions) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.user = user;
        this.transactions = transactions;
    }
}
exports.Account = Account;
