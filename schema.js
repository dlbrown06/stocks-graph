const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getOptionLedger: [OptionsLedger]
  }

  type Mutation {
    createOptionLedgerEntry(
      ticker: String!
      open_date: String!
      close_date: String
      status: String!
      contracts: Int!
      strike: String!
      credit: String
      debit: String
      expiration: String
    ): OptionsLedger
  }

  type OptionsLedger {
    id: ID!
    member_id: ID!
    ticker: String!
    open_date: String!
    close_date: String
    status: String!
    contracts: Int!
    strike: String
    credit: String
    debit: String
    expiration: String
    created_on: String
    updated_on: String
  }
`;

module.exports = typeDefs;