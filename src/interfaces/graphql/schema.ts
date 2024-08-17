import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
    balance: Int
    userId: ID
    transactions: [Transaction]
  }

  type Transaction {
    id: ID!
    payeer: String!
    payee: String!
    value: Int!
    account: Account!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String
    accounts: [Account]
  }

  type AdminLoginDTO {
    email: String!
    id: String!
    password: String
    token: String!
  }

  type Query {
    getAccountById(id: ID!): Account
    getAccountsByUserId(userId: ID!): [Account!]!
    getTransactionById(id: ID!): Transaction
    getUserById(id: ID!): User
    getUserByEmail(email: String!): User
  }

  type Mutation {
    createAccount(name: String!): Account
    createTransaction(
      payeer: String!
      payee: String!
      value: Int!
      accountId: ID!
    ): Transaction
    createUser(name: String!, email: String!, password: String!): AdminLoginDTO
    loginUser(email: String!, password: String!): AdminLoginDTO
    updateAccount(id: ID!, name: String, balance: Int): Account
    updateTransaction(
      id: ID!
      payeer: String
      payee: String
      value: Int
    ): Transaction
    updateUser(id: ID!, name: String, email: String, password: String): User
    deleteAccount(id: ID!): Account
    deleteTransaction(id: ID!): Transaction
    deleteUser(id: ID!): User
  }
`;
