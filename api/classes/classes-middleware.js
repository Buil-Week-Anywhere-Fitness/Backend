const Classes = require("./classes-model");

function validateClassId(req, res, next) {
  Classes.getById(req.params.id)
    .then((existingClass) => {
      if (existingClass) {
        req.existingClass = existingClass;
        next();
      } else {
        next({ status: 404, message: `user not found` });
      }
    })
    .catch(next);
}

module.exports = {
  validateClassId,
};
