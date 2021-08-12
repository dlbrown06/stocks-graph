const getMember = require('../../lib/getMember');
const { getLimitSql } = require('../../lib/sqlHelpers');

const Query = {
  ledger: async (parent, args, context) => {
    const { logger, db } = context;
    const { limit = 100, offset = 0 } = args;
    const member = getMember(context);
    if (!member) {
      throw new Error('Member Not Logged In');
    }

    // building the where clause
    const where = ['member_id=$1'];
    const whereParams = [member.id];

    try {
      const result = await db.query(
        `
          SELECT
            ri.symbol,
            ri.simple_name,
            ri.NAME,
            rlo.* 
          FROM
            stocks."member"
            M INNER JOIN stocks.robinhood_member_link rml ON rml.member_id = M.
            ID INNER JOIN stocks.robinhood_ledger_options rlo ON rlo.account = rml.account
            LEFT JOIN stocks.robinhood_instruments ri ON ri.symbol = rlo.chain_symbol 
          WHERE
            ${where.join(' and ')} 
          ORDER BY
            rlo.created_at DESC
          ${getLimitSql(limit, offset)};
        `,
        whereParams,
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
