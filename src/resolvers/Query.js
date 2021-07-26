const OptionsLedger = require("./OptionsLedger");
const Member = require("./Member");

module.exports = {
  ...OptionsLedger.Query,
  ...Member.Query,
};
