const getMember = require('../../lib/getMember');
const { getLimitSql } = require('../../lib/sqlHelpers');

const Query = {
  optionLedger: async (parent, args, context) => {
    const { logger, db } = context;
    const { limit = 100, offset = 0 } = args;
    // const member = getMember(context);
    // if (!member) {
    //   throw new Error('Member Not Logged In');
    // }

    // building the where clause
    // const where = ['ri.symbol is not null', 'member_id=$1'];
    // const whereParams = [member.id];

    try {
      // const result = await db.query(
      //   `
      //     SELECT
      //       ri.symbol,
      //       ri.simple_name,
      //       ri.NAME,
      //       rlo.*
      //     FROM
      //       stocks."member"
      //       M INNER JOIN stocks.robinhood_member_link rml ON rml.member_id = M.
      //       ID INNER JOIN stocks.robinhood_ledger_options rlo ON rlo.account = rml.account
      //       LEFT JOIN stocks.robinhood_instruments ri ON ri.symbol = rlo.chain_symbol
      //     WHERE
      //       ${where.join(' and ')}
      //     ORDER BY
      //       rlo.created_at DESC
      //     ${getLimitSql(limit, offset)};
      //   `,
      //   whereParams,
      // );
      const result = await db.query(
        `
          select * from stocks.rh_option_ledger order by fill_date desc
        `,
      );

      return result.rows;
    } catch (error) {
      logger.error(error, 'Failed to query ledger');
      return [];
    }
  },
};

const Mutation = {};

module.exports = {
  Query,
  Mutation,
};
