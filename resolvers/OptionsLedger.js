const moment = require("moment");
// const { getAthlete } = require("../utils");

const Query = {
  getOptionLedger: async (parent, args, context) => {
    const { logger, db } = context;
    // const athlete = getAthlete(context);
    // if (!athlete) {
    //   throw new Error("Athlete Not Logged In");
    // }

    try {
      const result = await db.query(
        "SELECT * FROM stocks.options_ledger_metrics ORDER BY status ASC, expiration DESC"
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
    // const athlete = getAthlete(context);
    // if (!athlete) {
    //   throw new Error("Athlete Not Logged In");
    // }

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
          process.env.STOCKS_DEFAULT_USER,
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
};

// const Mutation = {
//   createEquipment: async (parent, { name, slug, description }, context) => {
//     const { db, logger } = context;
//     const athlete = getAthlete(context);
//     if (!athlete) {
//       throw new Error("Athlete Not Logged In");
//     }

//     try {
//       const results = await db.query(
//         `
//         INSERT INTO wodiki.equipment
//           (name, slug, description)
//         VALUES
//           ($1, $2, $3)
//         RETURNING *
//       `,
//         [name, slug, description]
//       );

//       return _.get(results, "rows[0]", {});
//     } catch (error) {
//       logger.error(error, "Failed to mutate with createEquipment");
//       return { error };
//     }
//   },
//   updateEquipment: async (parent, { name, slug, description }, context) => {
//     const { db, logger } = context;
//     const athlete = getAthlete(context);
//     if (!athlete) {
//       throw new Error("Athlete Not Logged In");
//     }

//     try {
//       const results = await db.query(
//         `
//         INSERT INTO wodiki.equipment
//           (name, slug, description)
//         VALUES
//           ($1, $2, $3)
//         RETURNING *
//       `,
//         [name, slug, description]
//       );

//       return _.get(results, "rows[0]", {});
//     } catch (error) {
//       logger.error(error, "Failed to mutate with createEquipment");
//       return { error };
//     }
//   },
//   deleteEquipment: async (parent, { id }, context) => {
//     const { db, logger } = context;
//     const athlete = getAthlete(context);
//     if (!athlete) {
//       throw new Error("Athlete Not Logged In");
//     }

//     try {
//       await db.query(
//         `
//           DELETE
//           FROM
//             wodiki.equipment
//           WHERE
//             ID = $1
//         `,
//         [id]
//       );

//       return true;
//     } catch (error) {
//       logger.error(error, "Failed to mutate with deleteEquipment");
//       return false;
//     }
//   }
// };

module.exports = {
  Query,
  Mutation,
};
