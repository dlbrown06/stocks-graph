const { ApolloServerPluginInlineTrace } = require('apollo-server-core');

require('dotenv').config();

const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');

const db = require('./db');
const logger = require('./logger');

const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request) => ({ ...request, db, logger }),
  plugins: [ApolloServerPluginInlineTrace()],
});

const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(() => {
  console.log(`
      🚀  Server is running!
      🔉  Listening on port ${PORT}
      📭  Query at https://studio.apollographql.com/dev
    `);
});
