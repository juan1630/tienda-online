function validateId(req, resp, next) {
  if (req.params.id.length == 24) {
    next();
  } else {
    return resp.status(400).json({ ok: false, error: "invalid ID" });
  }
}


module.exports = validateId;