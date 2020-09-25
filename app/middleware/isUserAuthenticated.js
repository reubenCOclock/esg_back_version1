const dataMapper = require("../dataMapper");

const isUserAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    //console.log(req.headers.authorization);
    const user = await dataMapper.selectUserByToken(
      req.headers.authorization.replace("Bearer ", "")
    );
    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    } else {
      req.user = user;
      return next();
    }
  } else {
    //console.log("no authorization found");
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = isUserAuthenticated;
