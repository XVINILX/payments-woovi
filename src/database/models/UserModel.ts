import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { Users } from "../../domain/entities/Users";

export interface IUserModel extends Omit<Users, "id">, Document {}

const UserSchema: Schema = new Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.virtual("account", {
  ref: "Account",
  localField: "_id",
  foreignField: "user",
});

export const UserModel = mongoose.model<IUserModel>("Users", UserSchema);
