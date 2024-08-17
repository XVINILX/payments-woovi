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
exports.UsersRepository = void 0;
const UserModel_1 = require("../models/UserModel");
class UsersRepository {
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.UserModel.findById(userId).populate("account").exec();
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDocument = yield UserModel_1.UserModel.findOne({ email })
                .populate("account")
                .lean()
                .exec();
            console.log("Query Result:", userDocument); // Debugging line
            return userDocument;
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new UserModel_1.UserModel(userData);
            return user.save();
        });
    }
    update(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.UserModel.findByIdAndUpdate(userId, updateData, {
                new: true,
            }).exec();
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.UserModel.findByIdAndDelete(userId).exec();
        });
    }
}
exports.UsersRepository = UsersRepository;
