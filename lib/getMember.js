const { APP_SECRET } = require("../config/constants");

module.exports = (context) => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    return jwt.verify(token, APP_SECRET);
  }

  return undefined;
};
