const Ledger = require('./components/Ledger');
const OptionLedger = require('./components/OptionLedger');

module.exports = {
  ...Ledger.Query,
  ...OptionLedger.Query,
};
