const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/clientsModel");

const {
  restricted,
  only,
  checkUsernameExists,
  validateRoleName,
} = require("./auth-middlewares");

const secret = require("../secrets/index");

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 8);
  User.add({ username, password: passwordHash })
    .then((saved) => res.status(201).json(saved))
    .catch(next);
});

router.post("/login", checkUsernameExists, (req, res) => {
  let { username, password } = req.body;

  User.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, req.user.password)) {
        const token = generateToken(user);

        // the server needs to return the token to the client

        res.status(200).json({
          message: `Welcome ${req.user.username}!, have a token...`,
          token, // token attached as part of the response
        });

        // return invalid credentials message
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const secret = "uhd87h3p333##R3r3r3r3r#R##R3r";
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options); // this method is synchronous
}

router.post("/login", checkUsernameExists, (req, res, next) => {
  const { password } = req.body;
  if (bcrypt.compareSync(password, req.user.password)) {
    req.session.user = req.user;
    res.json({ message: `Welcome ${req.user.username}` });
  } else {
    next({ status: 401, message: "Invalid credentials" });
  }
});

router.get("/logout", (req, res, next) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ message: "logged out" });
      }
    });
  } else {
    res.status(200).json({ message: "no session" });
  }
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
    cusomeMessage: "Something went wrong inside the auth router",
  });
});

(module.exports = router),
  {
    jwtSecret: process.env.JWT_SECRET || "shh",
  };
