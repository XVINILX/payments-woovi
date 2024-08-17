import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { Account } from "../../domain/entities/Account";

export interface IAccountModel extends Omit<Account, "id">, Document {}

const AccountSchema: Schema = new Schema({
  id: {
    type: String,
    default: uuidv4, // Automatically generate a UUID
    unique: true, // Ensure the UUID is unique
    required: true, // Mark it as required
  },
  name: { type: String, required: true },
  balance: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transactions" }],
});

export const AccountModel = mongoose.model<IAccountModel>(
  "Account",
  AccountSchema
);
