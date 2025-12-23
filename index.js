require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

const { connectDB } = require("./src/config/db");
const { context } = require("./src/graphql/context");
const { typeDefs } = require("./src/graphql/typeDefs");
const { resolvers } = require("./src/graphql/resolvers");

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await connectDB();
  await server.start();

  app.use(
    "/graphql",
    cors({
      origin: "*",
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
    express.json(),
    expressMiddleware(server, { context })
  );

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`🚀 Server running in http://localhost:${PORT}/graphql`);
  });
}

startServer();
