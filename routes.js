const express = require("express");
const record_db = require("./db/record"); // new
const user_db = require("./db/user"); // new
const record = require("./db/record");
const { replaceOne, update } = require("./db/record");
const router = express.Router();

// record api

router.get("/records/:user", async (req, res) => {
  const user = req.params.user;
  const list = await record_db.find({ user: user });
  res.send(list);
});

router.post("/records", async (req, res) => {
  // console.log(req.body);

  const new_cost = new record_db({
    user: req.body.user,
    cost: req.body.cost,
    category: req.body.category,
    updated_time: Date.now(),
  });

  await new_cost.save((err) => {
    console.log(err);
  });
  res.send(new_cost);
});

router.post("/records/update", async (req, res) => {
  console.log(req.body.cost);

  try {
    const doc = await record_db.updateOne(
      { _id: req.body.id },
      { cost: req.body.cost, category: req.body.category }
    );
  } catch (err) {
    console.log(err);
  }

  res.send("data updated");
});

router.delete("/records/:id", (req, res) => {
  const id = req.params.id;

  record_db.deleteOne({ _id: id }, (err) => {
    console.log(err);
  });

  res.send("recieved delete command");
});

// user api

router.post("/user", async (req, res) => {
  console.log(req.body);

  try {
    const user = await user_db.find({
      email: req.body.email,
      name: req.body.name,
    });
    if (user) {
      res.send("Login successfully");
    } else if (await user_db.find({ email: req.body.email })) {
      res.send("Name is incorrent");
    } else {
      const new_user = new user_db({
        email: req.body.email,
        name: req.body.name,
      });
      await new_user.save((err) => {
        console.log(err);
      });
      res.send("Signup successfully");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
