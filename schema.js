const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Query {
    getOptionLedger: [OptionsLedger]
    getOptionMonthlyPNL: [OptionsPNL]
    getOptionMonthlyPNLbyTicker: [OptionsPNLbyTicker]
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    createOptionLedgerEntry(
      ticker: String!
      option_type: String!
      open_date: Date!
      close_date: String
      status: String!
      contracts: Int!
      strike: String!
      credit: String
      debit: String
      expiration: String
    ): OptionsLedger

    updateOptionLedgerEntry(
      id: ID!
      ticker: String
      option_type: String
      open_date: Date
      close_date: String
      status: String
      contracts: Int
      strike: String
      credit: String
      debit: String
      expiration: String
    ): OptionsLedger

    deleteOptionLedgerEntry(id: ID!): Boolean
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

  type OptionsLedger {
    id: ID!
    member_id: ID!
    ticker: String!
    option_type: String!
    open_date: String!
    close_date: String
    status: String!
    contracts: Int!
    strike: String
    credit: String
    debit: String
    expiration: String
    annualized_return: String
    daily_return: String
    target_premium: String
    buyout_target: String
    gross_credit: String
    net_credit: String
    collateral: String
    days_open: Int
    created_on: String
    updated_on: String
  }

  type OptionsPNLbyTicker {
    member_id: ID!
    month: String!
    ticker: String!
    credit: String!
    debit: String
    total: String!
  }

  type OptionsPNL {
    member_id: ID!
    month: String!
    credit: String!
    debit: String
    total: String!
  }
`;

module.exports = typeDefs;
