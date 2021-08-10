const moment = require("moment");
const getMember = require("../lib/getMember");

const Query = {
  ledger: async (parent, args, context) => {
    const { logger, db } = context;
    const member = getMember(context);
    if (!member) {
      throw new Error("Member Not Logged In");
    }

    // building the where clause
    const where = ["member_id=$1"];
    const whereParams = [member.id];

    const { option_id } = args;
    where.push("id = $2");
    whereParams.push(option_id);

    try {
      const result = await db.query(
        `SELECT * FROM stocks.options_ledger_metrics WHERE ${where.join(
          " and "
        )} ORDER BY open_date DESC, close_date DESC, updated_on DESC`,
        whereParams
      );

      return result.rows
        .map((row) => {
          row.open_date = moment(row.open_date).format("YYYY-MM-DD");
          row.close_date = moment(row.close_date).format("YYYY-MM-DD");
          row.expiration = moment(row.expiration).format("YYYY-MM-DD");
          return row;
        })
        .pop();
    } catch (error) {
      logger.error({ error }, "Failed to query option ledger");
      return [];
    }
  },

  optionLedger: async (parent, args, context) => {
    const { logger, db } = context;
    const member = getMember(context);
    if (!member) {
      throw new Error("Member Not Logged In");
    }

    // building the where clause
    const where = ["member_id=$1"];
    const whereParams = [member.id];
    const { tickers, status } = args;
    if (tickers) {
      where.push("ticker = ANY ($2)");
      whereParams.push(tickers);
    }
    if (status) {
      where.push("status = ANY ($3)");
      whereParams.push(status);
    }

    try {
      const result = await db.query(
        `SELECT * FROM stocks.options_ledger_metrics WHERE ${where.join(
          " and "
          // )} ORDER BY status ASC, expiration DESC, updated_on DESC`,
        )} ORDER BY open_date DESC, close_date DESC, updated_on DESC`,
        whereParams
      );

      return result.rows.map((row) => {
        row.open_date = moment(row.open_date).format("YYYY-MM-DD");
        row.close_date = moment(row.close_date).format("YYYY-MM-DD");
        row.expiration = moment(row.expiration).format("YYYY-MM-DD");
        return row;
      });
    } catch (error) {
      logger.error({ error }, "Failed to query option ledger");
      return [];
    }
  },
};

const Mutation = {};

module.exports = {
  Query,
  Mutation,
};
