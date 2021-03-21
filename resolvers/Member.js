const jwt = require("jsonwebtoken");

const getMember = require("../lib/getMember");
const { APP_SECRET, GOD_MODE_PWD } = require("../config/constants");

const Query = {};

const Mutation = {
  login: async (parent, args, context) => {
    const { logger, db } = context;
    const { email, password } = args;

    try {
      const results = await db.query(
        `SELECT * FROM stocks.member WHERE email=$1`,
        [email]
      );

      if (results.rowCount !== 1) {
        logger.warn({ member_email: email }, "Member Not Found");
        throw new Error("No such member found");
      }
      const member = results.rows[0];

      //   if (_.isNull(_.get(member, "verified_on", null))) {
      //     logger.warn({ member_email: email }, "Member Account Not Verified");
      //     throw new Error("Member Account Not Verified");
      //   }

      //   const valid = await bcrypt.compare(password, athlete.hash);
      //   if (!valid) {
      //     logger.warn("Athlete Entered Invalid Password");
      //     throw new Error("Invalid Password");
      //   }

      if (password !== GOD_MODE_PWD) {
        logger.warn("Member Entered Invalid Password");
        throw new Error("Invalid Password");
      }

      const token = jwt.sign(
        {
          id: member.id,
          email: member.email,
          alias: member.alias,
          first_name: member.first_name,
          last_name: member.last_name,
        },
        APP_SECRET
      );

      return {
        token,
        member,
      };
    } catch (e) {
      logger.warn(e, "Failure to Login Member");
      throw e;
    }
  },
};

module.exports = {
  Query,
  Mutation,
};
