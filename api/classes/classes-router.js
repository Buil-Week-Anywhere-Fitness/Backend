const router = require("express").Router();
const Classes = require("./classes-model");
const { restricted, only } = require("../auth/auth-middlewares");
const { validateClassId } = require("./classes-middleware");

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

router.delete(
  "/:id",
  restricted,
  only("instructor"),
  validateClassId,
  (req, res, next) => {
    const id = req.params.id;
    deletedClass = req.existingClass;
    Classes.remove(id)
      .then((deletedClassCount) => {
        res.status(200).json(deletedClass);
      })
      .catch(next);
  }
);

router.get("/client_classes", (req, res, next) => {
  Classes.getClasses()
    .then((classes) => {
      res.status(200).json(classes);
    })
    .catch(next);
});

router.get("/:client_class_id", (req, res, next) => {
  Classes.getClassesById(req.params.client_class_id)
    .then((selectedClientClass) => {
      res.status(200).json(selectedClientClass);
    })
    .catch(next);
});

module.exports = router;
