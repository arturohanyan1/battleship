const router = require("express").Router();
const { Album } = require('../db/models');

router.get("/", async (req, res) => {
  console.log('server', req, res)
  try {
    res.json({ dd: 44 });
    //   const allBlocks = await Block.findAll({ raw: true })
    //   // console.log(allBlocks);
    //   res.json(allBlocks);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  // router.get('/', async (req, res) => {
  //   try {
  //     const user_id = req.session.superuserID;
  //     // console.log(user_id);
  //     const albums = await Album.findAll({ where: { user_id }, raw: true });
  //     // console.log(albums);
  //     res.json(albums);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });
});

module.exports = router
