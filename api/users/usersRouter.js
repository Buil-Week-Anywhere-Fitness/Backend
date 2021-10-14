const express = require("express");
const router = express.Router();

const Users = require("./usersModel");
const { restricted, only } = require("../auth/auth-middlewares");

router.get("/", restricted, (req, res, next) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:user_id", restricted, only("admin"), (req, res, next) => {
  Users.findById(req.params.user_id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

module.exports = router;