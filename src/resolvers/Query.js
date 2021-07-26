const OptionsLedger = require("./OptionsLedger");
const Ledger = require("./Ledger");
const Member = require("./Member");

module.exports = {
  ...OptionsLedger.Query,
  ...Ledger.Query,
  ...Member.Query,
};
