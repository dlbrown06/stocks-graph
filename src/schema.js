const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    ledger(offset: Int, limit: Int): [LedgerRecord]!
    optionLedger(offset: Int, limit: Int): [LedgerOptionRecord]!
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
    chain_id: ID!
    name: String!
    symbol: String!
    simple_name: String!
    ref_id: ID
    direction: String!
    legs: [LedgerOptionRecordLeg]!
    type: String!
    trigger: String!
    state: String!
    price: Float
    premium: Float
    processed_premium: Float!
    quantity: Int!
    processed_quantity: Int!
    pending_quantity: Int!
    canceled_quantity: Int!
    opening_strategy: String
    closing_strategy: String
    response_strategy: String
    stop_price: Float!
    time_in_force: String!
    cancel_url: String
    created_at: String!
    updated_at: String!
  }

  type LedgerOptionRecordLeg {
    id: ID!
    expiration_date: String
    option: String
    option_type: String
    position_effect: String
    ratio_quantity: Int
    side: String
    strike_price: Float
    executions: [LedgerRecordExecution]
  }
`;

module.exports = typeDefs;
