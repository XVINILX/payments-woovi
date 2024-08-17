import Koa from "koa";
import dotenv from "dotenv";
import bodyParser from "koa-bodyparser";
import { ApolloServer } from "apollo-server-koa";
import { connectToDatabase } from "./infrastructure/database/MongoConnection";
import { typeDefs } from "./interfaces/graphql/schema";
import { authMiddleware } from "./middleware/authMiddleware";
import { resolvers } from "./interfaces/graphql/resolvers";

const startServer = async () => {
  const app = new Koa();
  app.use(authMiddleware);
  app.use(bodyParser());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ ctx }: { ctx: Koa.Context }) => ({
      ...ctx,
      user: ctx.state.user,
    }),
  });

  dotenv.config();
  await server.start();

  server.applyMiddleware({ app });

  await connectToDatabase();

  const port = Number(process.env.PORT) || 4000;

  app.listen(port, () => {
    console.log(
      `Server running on http://localhost:${port}` + server.graphqlPath
    );
  });
};

// Call the async function to start the server
startServer().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
