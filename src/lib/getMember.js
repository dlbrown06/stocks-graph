const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../config/constants');

module.exports = (context) => {
  const Authorization = context.req.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    return jwt.verify(token, APP_SECRET);
  }

  return undefined;
};
