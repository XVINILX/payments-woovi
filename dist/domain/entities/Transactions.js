"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
class Transactions {
    constructor(id, payeer, value, payee, account) {
        this.id = id;
        this.payeer = payeer;
        this.value = value;
        this.payee = payee;
        this.account = account;
    }
}
exports.Transactions = Transactions;
