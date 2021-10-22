const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");
const { JWT_SECRET } = require("../secrets");
const { checkUsernameExists, validateRoleName } = require("./auth-middlewares");

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    role_name: user.role_name,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

router.get("/", (req, res, next) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.post("/register", (req, res, next) => {
  const { name, username, email, password, role_id } = req.body;
  const hash = bcrypt.hashSync(password, 8);
  const user = { name, username, email, password: hash, role_id };
  Users.add(user)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.post("/login", checkUsernameExists, (req, res) => {
  const { username, password } = req.body;

  if (req.user && bcrypt.compareSync(password, req.user.password)) {
    const token = generateToken(req.user);
    res.status(200).json({
      message: `Welcome back ${req.user.username}!`,
      token,
    });
  } else {
    next({ status: 401, message: "Invalid credentials" });
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
