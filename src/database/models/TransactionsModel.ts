import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { Transactions } from "../../domain/entities/Transactions";

export interface ITransactionsModel
  extends Omit<Transactions, "id">,
    Document {}

const TransactionsSchema: Schema = new Schema({
  id: {
    type: String,
    default: uuidv4, // Automatically generate a UUID
    unique: true, // Ensure the UUID is unique
    required: true, // Mark it as required
  },
  payeer: { type: String, required: true },
  payee: { type: String, required: true },
  value: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  account: { type: Schema.Types.ObjectId, ref: "Account", required: true }, // Reference to Account
});

export const TransactionsModel = mongoose.model<ITransactionsModel>(
  "Transactions",
  TransactionsSchema
);
