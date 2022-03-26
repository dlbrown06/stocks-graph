const getMember = require('../../lib/getMember');
const { getLimitSql } = require('../../lib/sqlHelpers');

const Query = {
  optionLedger: async (parent, args, context) => {
    const { logger, db } = context;
    const { ticker = null, start_time = null, limit = 100, offset = 0 } = args;
    // const member = getMember(context);
    // if (!member) {
    //   throw new Error('Member Not Logged In');
    // }

    // building the where clause
    const where = ['1=1'];
    const whereParams = [];
    let whereCnt = 1;
    if (ticker) {
      where.push(`ticker = $${whereCnt++}`);
      whereParams.push(ticker);
    }
    if (start_time) {
      where.push(`fill_date >= $${whereCnt++}`);
      whereParams.push(start_time);
    }

    try {
      const result = await db.query(
        `
          SELECT 
            * 
          FROM stocks.rh_option_ledger 
          WHERE
            ${where.join(' and ')}
          ORDER BY fill_date DESC
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
