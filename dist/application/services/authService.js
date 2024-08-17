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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const comparePass_1 = require("../../utils/comparePass");
const hashPassword_1 = __importDefault(require("../../utils/hashPassword"));
const generateRandomPassort_1 = require("../../utils/generateRandomPassort");
class AuthService {
    constructor(userRepository) {
        var _a;
        this.userRepository = userRepository;
        this.SECRETKEY = (_a = process.env.SECRETKEY) !== null && _a !== void 0 ? _a : "";
    }
    createToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const SECRET_KEY = this.SECRETKEY;
            return {
                access_token: jsonwebtoken_1.default.sign({ sub: user.email, email: user.email }, SECRET_KEY, {
                    expiresIn: "1h",
                }),
            };
        });
    }
    checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const finalToken = token.startsWith("Bearer ") ? token.slice(7) : token;
                const decoded = jsonwebtoken_1.default.verify(finalToken, this.SECRETKEY);
                const userId = decoded.sub;
                if (userId) {
                    const userExists = yield this.userRepository.getById(userId);
                    return userExists ? userExists : null;
                }
                return null;
            }
            catch (error) {
                return null;
            }
        });
    }
    refreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.checkToken(token);
            if (user) {
                const newToken = yield this.createToken(user);
                return {
                    id: user.id,
                    email: user.email,
                    token: newToken.access_token,
                };
            }
            return null;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getByEmail(email);
            if (user && user.password) {
                const comparePass = yield (0, comparePass_1.comparePassword)(password, user.password);
                if (comparePass) {
                    const jwtToken = yield this.createToken(user);
                    return {
                        email: user.email,
                        id: user.id,
                        token: jwtToken.access_token,
                    };
                }
            }
            return null;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userQuery = yield this.userRepository.getByEmail(user.email);
            if (!userQuery) {
                let password = user.password;
                if (password) {
                    password = yield (0, hashPassword_1.default)(password);
                    user.password = password;
                }
                else {
                    password = (0, generateRandomPassort_1.generateRandomPassword)();
                    password = yield (0, hashPassword_1.default)(password);
                    user.password = password;
                }
                const newUser = yield this.userRepository.create(user);
                return {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                };
            }
            return null;
        });
    }
}
exports.AuthService = AuthService;
