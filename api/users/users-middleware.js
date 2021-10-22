const User = require("../users/users-model");

function requireBody(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    next();
  } else {
    next({ apiCode: 400, apiMessage: "body is required" });
  }
}

async function checkUsernameFree(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else {
      next({ message: "Username taken", status: 422 });
    }
  } catch (err) {
    next(err);
  }
}

/*
  If the username in req.body does NOT exist in the database */
async function checkUsernameExists(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    if (users.length) {
      req.user = users[0];
      next();
    } else {
      next({ message: "Invalid Credentials", status: 401 });
    }
  } catch (err) {
    next();
  }
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter */
function checkPasswordLength(req, res, next) {
  if (!req.body.password || req.body.password.length < 3) {
    next({ message: "Password must be longer than 3 chars", status: 422 });
  } else {
    next();
  }
}

module.exports = {
  requireBody,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
};
