const express = require("express");
const record = require("../db/record");
const router = express.Router();

router.get("/:user", async (req, res) => {
  const user = req.params.user.toLowerCase();
  const list = await record.find({ user: user });
  res.send(list);
});

router.post("/", async (req, res) => {
  // console.log(req.body);

  const new_cost = new record({
    user: req.body.user.toLowerCase(),
    cost: req.body.cost,
    category: req.body.category.toLowerCase(),
    updated_time: Date.now(),
  });

  await new_cost.save((err) => {
    console.log(err);
  });
  res.send(new_cost);
});

router.post("/update", async (req, res) => {
  console.log(req.body.cost);

  try {
    const doc = await record.updateOne(
      { _id: req.body.id },
      { cost: req.body.cost, category: req.body.category }
    );
  } catch (err) {
    console.log(err);
  }

  res.send("data updated");
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  record.deleteOne({ _id: id }, (err) => {
    console.log(err);
  });

  res.send("recieved delete command");
});

module.exports = router;
