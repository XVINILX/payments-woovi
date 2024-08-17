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
exports.withAuth = void 0;
// Higher-order function to wrap resolvers with authentication
const withAuth = (resolver, requiredRoles = []) => {
    return (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.state.user) {
            throw new Error("Unauthorized");
        }
        // Check if user roles are required and if the user has the required roles
        if (requiredRoles.length &&
            !requiredRoles.includes(context.state.user.role)) {
            throw new Error("Forbidden");
        }
        // Add user info to the context to be accessible within the resolver
        context.state.userInfo = context.state.user;
        // Call the original resolver
        return resolver(parent, args, context, info);
    });
};
exports.withAuth = withAuth;
