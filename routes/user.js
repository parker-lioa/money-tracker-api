const express = require("express");
const user = require("../db/user");
const router = express.Router();
const dayCounter = require("../DayCounter");
// get user data

router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    const name = req.query.name;
    const the_user = await user.find({ email: email, name: name });

    const package = {
      total_cost: the_user[0].total_cost,
      total_money: the_user[0].total_money,
      days_left: dayCounter.How_many_days_left(Date.now()),
      };
      
    console.log(package);
    res.send(package);
    return res.end();
  } catch (err) {
    console.log(err);
  }
});

// sign up
router.post("/signin", async (req, res) => {
  const { body } = req;
  const { email, name } = body;

  try {
    const the_user = await user.find({ email: email }, (err) => {
      if (err) {
        console.log(err);
        res.send("something went wrong when find user data");
        return res.end();
      }
    });
    if (!the_user) {
      res.send({ success: false, message: "registe first!" });
      res.end();
    } else if (the_user[0].name != name) {
      res.send({ success: false, message: "wrong name!" });
      res.end();
    } else {
      res.send({ success: true, message: "sign in successfully" });
      res.end();
    }
  } catch (err) {
    console.log(err);
  }
});

//sign in

router.post("/signup", async (req, res) => {
  try {
    const { body } = req;
    const { email, name } = body;
    const the_user = await user.find({ email: email }, (err) => {
      if (err) {
        console.log("something went wrong when find user data");
        res.send({
          success: false,
          message: "something went wrong when find user data",
        });
        return res.end();
      }
    });
    if (!the_user) {
      const new_user = new user({
        email: email,
        name: name,
        total_cost: 0,
        total_money: 0,
      });

      new_user.save();
      res.send({ success: true, message: "sign up successfully" });
      return res.end();
    }

    res.send({
      success: false,
      message: "this email has been registered.",
    });
    return res.end();
  } catch (err) {
    console.log(err);
  }
});

// update user data

router.post("/update", async (req, res) => {
  try {
    const { email, name, total_cost, total_money } = req.query;
    const doc = await user.updateOne(
      { email: email, name: name },
      { total_cost: total_cost, total_money: total_money }
    );

    res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
