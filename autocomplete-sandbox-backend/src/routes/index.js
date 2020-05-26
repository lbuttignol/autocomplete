const { findAddress } = require('../services/google');

module.exports = {
  findAddress: async (req, res) => {
    try {
      const data = await findAddress(req.query.search);
      res.json(data);
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  }
}