const Users = require("../users/usersModel");

function validateInstructorRole(user_id) {
  Users.findBy(req.decodedToken.subject).then((user) => {
    if (user.role_id === 1) {
      next();
    } else {
      next({ status: 403, message: "This is for instructors only" });
    }
  });
}

module.exports = {
  validateInstructorRole,
  restricted
};
