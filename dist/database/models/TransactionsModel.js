"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const uuid_1 = require("uuid");
const TransactionsSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default: uuid_1.v4, // Automatically generate a UUID
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
    account: { type: mongoose_1.Schema.Types.ObjectId, ref: "Account", required: true }, // Reference to Account
});
exports.TransactionsModel = mongoose_1.default.model("Transactions", TransactionsSchema);
