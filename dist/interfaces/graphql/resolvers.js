"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const AccountResolver_1 = require("./resolvers/AccountResolver");
const transactionsResolvers_1 = require("./resolvers/transactionsResolvers");
const userResolvers_1 = require("./resolvers/userResolvers");
exports.resolvers = {
    Query: Object.assign(Object.assign(Object.assign({}, AccountResolver_1.accountResolvers.Query), userResolvers_1.userResolvers.Query), transactionsResolvers_1.transactionResolvers.Query),
    Mutation: Object.assign(Object.assign(Object.assign({}, AccountResolver_1.accountResolvers.Mutation), userResolvers_1.userResolvers.Mutation), transactionsResolvers_1.transactionResolvers.Mutation),
};
