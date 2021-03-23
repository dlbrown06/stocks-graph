require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const db = require("./db");
const logger = require("./logger");

//resolvers
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const resolvers = {
  Query,
  Mutation,
};

const typeDefs = require("./schema.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request) => {
    return { ...request, db, logger };
  },
});

const app = express();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}` + server.graphqlPath
  )
);
