const moment = require("moment");
const getMember = require("../lib/getMember");

const Query = {
  getOptionLedger: async (parent, args, context) => {
    const { logger, db } = context;
    const member = getMember(context);
    if (!member) {
      throw new Error("Member Not Logged In");
    }

    try {
      const result = await db.query(
        "SELECT * FROM stocks.options_ledger_metrics WHERE member_id=$1 ORDER BY status ASC, expiration DESC, updated_on DESC",
        [member.id]
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

const Mutation = {
  createOptionLedgerEntry: async (
    parent,
    {
      ticker,
      option_type,
      open_date,
      close_date,
      status,
      contracts,
      strike,
      credit,
      debit,
      expiration,
    },
    context
  ) => {
    const { db, logger } = context;
    const member = getMember(context);
    if (!member) {
      throw new Error("Member Not Logged In");
    }

    try {
      const results = await db.query(
        `
        INSERT INTO stocks.options_ledger_metrics
          (member_id, ticker, option_type, open_date, close_date, status, contracts, strike, credit, debit, expiration)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `,
        [
          member.id,
          ticker,
          option_type,
          open_date,
          close_date,
          status,
          contracts,
          strike,
          credit,
          debit,
          expiration,
        ]
      );

      return results.rows[0];
    } catch (error) {
      logger.error(error, "Failed to mutate with createOptionLedgerEntry");
      return { error };
    }
  },
  updateOptionLedgerEntry: async (parent, args, context) => {
    const member = getMember(context);
    if (!member) {
      throw new Error("Member Not Logged In");
    }

    const id = args.id;
    delete args["id"];

    const mutations = [];
    let sql = `UPDATE stocks.options_ledger SET `;
    let mutationCnt = 0;
    for (const param in args) {
      mutations[param] = args[param];
      sql += `${param}=$${++mutationCnt},`;
    }
    sql += `updated_on=$${++mutationCnt} WHERE id=$${mutationCnt + 1} AND $${
      mutationCnt + 2
    }`;
    const payload = [];
    for (const param in mutations) {
      payload.push(mutations[param]);
    }
    payload.push(new Date());
    payload.push(id);
    payload.push(member.id);
    sql += ` RETURNING *`;

    try {
      const results = await db.query(sql, payload);

      return results.rows[0];
    } catch (error) {
      logger.error(error, "Failed to mutate with updateOptionLedgerEntry");
      return { error };
    }
  },
  deleteOptionLedgerEntry: async (parent, args, context) => {
    const { db, logger } = context;
    const member = getMember(context);
    if (!member) {
      throw new Error("Member Not Logged In");
    }

    const { id } = args;

    try {
      const results = await db.query(
        `DELETE FROM stocks.options_ledger WHERE id=$1 AND member_id=$2`,
        [id, member.id]
      );

      return true;
    } catch (error) {
      logger.error(error, "Failed to mutate with deleteptionLedgerEntry");
      return false;
    }
  },
};

module.exports = {
  Query,
  Mutation,
};
