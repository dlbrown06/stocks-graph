require("dotenv").config();
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const db = require("./db");
const logger = require("./logger");

//resolvers
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const resolvers = {
  Query,
  Mutation
};
 
const typeDefs = require('./schema.js');
 
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: request => {
    return { ...request, db, logger };
  }
});
 
const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);