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
        "SELECT * FROM stocks.options_ledger ORDER BY updated_on DESC"
      );
      return result.rows;
    } catch (error) {
      logger.error({ error }, "Failed to query option ledger");
      return [];
    }
  }
};

const Mutation = {
  createOptionLedgerEntry: async (parent, { 
    ticker, 
    open_date,
    close_date,
    status,
    contracts,
    strike,
    credit,
    debit,
    expiration 
  }, context) => {
    const { db, logger } = context;
    // const athlete = getAthlete(context);
    // if (!athlete) {
    //   throw new Error("Athlete Not Logged In");
    // }

    try {
      const results = await db.query(
        `
        INSERT INTO stocks.options_ledger
          (member_id, ticker, open_date, close_date, status, contracts, strike, credit, debit, expiration)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `,
        [process.env.STOCKS_DEFAULT_USER, ticker, open_date, close_date, status, contracts, strike, credit, debit, expiration]
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
  Mutation
};
