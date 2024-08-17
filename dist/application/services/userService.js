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
exports.UsersService = void 0;
class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.getById(userId);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.getByEmail(email);
        });
    }
    updateUser(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.update(userId, updateData);
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.delete(userId);
        });
    }
}
exports.UsersService = UsersService;
