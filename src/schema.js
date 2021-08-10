const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    ledger: [String]
    optionLedger: [String]
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String
    member: Member
  }

  type Member {
    id: String
    email: String
    alias: String
    first_name: String
    last_name: String
    created_on: String
  }
`;

module.exports = typeDefs;
