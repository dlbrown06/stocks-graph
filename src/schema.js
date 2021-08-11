const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    ledger: [LedgerRecord]
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

  type LedgerRecord {
    id: ID!
    instrument_id: ID!
    symbol: String!
    simple_name: String!
    name: String!
    fees: Float!
    side: String!
    type: String!
    price: Float
    state: String!
    cancel: String
    trigger: String!
    quantity: Float!
    executions: String!
    stop_price: Float
    average_price: Float
    reject_reason: String
    created_at: String!
    updated_at: String!
  }

  type LedgerRecordExecution {
    
  }
`;

module.exports = typeDefs;
