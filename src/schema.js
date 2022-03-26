const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    ledger(offset: Int, limit: Int): [LedgerRecord]!
    optionLedger(ticker: String, offset: Int, limit: Int): [LedgerOptionRecord]!
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

  "Robinhood UUID representing the symbol"
  type LedgerRecord {
    id: ID!
    "Robinhood UUID representing the symbol"
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
    executions: [LedgerRecordExecution]!
    stop_price: Float
    average_price: Float
    reject_reason: String
    created_at: String!
    updated_at: String!
  }

  type LedgerRecordExecution {
    id: ID!
    ipo_access_execution_rank: String
    price: Float!
    quantity: Float!
    settlement_date: String!
    timestamp: String!
  }

  "Robinhood UUID representing the symbol"
  type LedgerOptionRecord {
    id: ID!
    fill_date: String!
    ticker: String!
    direction: String!
    strike: Float!
    expiration_date: String!
    quantity: Int!
    price: Float!
    total: Float!
    created_at: String!
  }
`;

module.exports = typeDefs;
