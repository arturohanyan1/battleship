const router = require("express").Router();
const { User } = require('../db/models');

router.get("/", async (req, res) => {
  try {
    console.log('req.query', req.query)
    const id = req.query.id
    const allBlocks = await User.findOne({ where: { id: id } })
    res.json(allBlocks);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router
