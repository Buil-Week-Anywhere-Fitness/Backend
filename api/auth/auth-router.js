const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../users/usersModel");

const {
  //   restricted,
  //   only,
  checkUsernameExists,
  validateRoleName,
} = require("./auth-middlewares");

const { JWT_SECRET } = require("../secrets");

router.post("/register", validateRoleName, (req, res, next) => {
  const { username, password } = req.body;
  const { role_name } = req;
  const hash = bcrypt.hashSync(password, 8);
  User.add({ username, password: hash, role_name })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
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
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
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

// function generateToken(user) {
//   const payload = {
//     subject: user.id,
//     username: user.username,
//   };
//   const secret = "uhd87h3p333##R3r3r3r3r#R##R3r";
//   const options = {
//     expiresIn: "1d",
//   };
//   return jwt.sign(payload, secret, options); // this method is synchronous
// }

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
