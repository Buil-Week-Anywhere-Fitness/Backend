const router = require("express").Router();
const Classes = require("./classes-model");
const {
  restricted,
  only,
  validateInstructorRole,
} = require("../auth/auth-middlewares");

// This endpoint is restricted to logged in users only
router.get("/", restricted, only("instructor"), (req, res, next) => {
  Classes.getAll()
    .then((classes) => {
      res.status(200).json(classes);
    })
    .catch(next);
});

router.get("/:class_id", restricted, (req, res, next) => {
  Classes.getById(req.params.class_id)
    .then((selectedClass) => {
      res.status(200).json(selectedClass);
    })
    .catch(next);
});

router.post("/", restricted, only("instructor"), (req, res, next) => {
  Classes.add(req.body)
    .then((newClass) => {
      res.status(201).json(newClass);
    })
    .catch(next);
});

router.put("/:id", restricted, only("instructor"), (req, res, next) => {
  Classes.update(req.params.id, req.body)
    .then((updatedClass) => {
      res.status(200).json(updatedClass);
    })
    .catch(next);
});

module.exports = router;
