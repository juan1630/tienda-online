const jwt = require("jsonwebtoken");

function validateToken(req, resp, next) {

  const { token } = req.body;

  try {
    if (token.length > 1 || token == undefined) {
      const validatedToken = jwt.verify(token, process.env.SECRET);
      if (validatedToken) {
        next();
      }
    } else {
      return resp.status(400).json({
        ok: false,
        message: "invalid token",
      });
    }
  } catch (error) {
    console.log(error);
    return resp.status(400).json({
      ok: false,
      message: "invalid token",
    });
  }
}

module.exports = validateToken;
