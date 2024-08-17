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
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const apollo_server_koa_1 = require("apollo-server-koa");
const MongoConnection_1 = require("./infrastructure/database/MongoConnection");
const schema_1 = require("./interfaces/graphql/schema");
const authMiddleware_1 = require("./middleware/authMiddleware");
const resolvers_1 = require("./interfaces/graphql/resolvers");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new koa_1.default();
    app.use(authMiddleware_1.authMiddleware);
    app.use((0, koa_bodyparser_1.default)());
    const server = new apollo_server_koa_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: resolvers_1.resolvers });
    yield server.start();
    server.applyMiddleware({ app });
    yield (0, MongoConnection_1.connectToDatabase)();
    const port = Number(process.env.PORT) || 4000;
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}` + server.graphqlPath);
    });
});
// Call the async function to start the server
startServer().catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
});
