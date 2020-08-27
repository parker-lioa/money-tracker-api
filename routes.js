const express = require("express");
const db = require("./db"); // new
const router = express.Router();

// Get all posts
router.get("/records", async (req, res) => {
  const list = await db.find();
  res.send(list);
});

router.post("/records", async (req, res) => {
  
  console.log(req.body);

  const new_cost = new db({
    cost:req.body.cost,
    category:req.body.category,
    updated_time:Date.now()
  });

  await new_cost.save((err)=>{console.log(err)});
  res.send(new_cost);

});


module.exports = router;
