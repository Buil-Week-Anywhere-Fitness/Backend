const router = require("express").Router();
const Classes = require("./classes-model");
const { restricted, only, validateInstructorRole } = require("../auth/auth-middlewares");


// This endpoint is restricted to logged in users only 
router.get("/", restricted, only(1), (req, res, next) => {
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

router.post("/", (req, res, next) => {
  Classes.add(req.body)
    .then((newClass) => {
      res.status(201).json(newClass);
    })
    .catch(next);
});

module.exports = router;
