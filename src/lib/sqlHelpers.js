module.exports = {
  /**
   * Consistently build the LIMIT statement based on limit and offset variables
   *
   * @param int limit
   * @param int offset
   * @returns
   */
  getLimitSql: (limit, offset) => {
    let limitSql = '';
    if (limit) {
      limitSql += `LIMIT ${limit}`;

      if (offset) {
        limitSql += `OFFSET ${offset}`;
      }
    }

    return limitSql;
  },
};
