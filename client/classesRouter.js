const router = require("express").Router();
const Client = require("./classesModel");
const { restricted } = require("../api/auth/auth-middlewares");

// Get All clients
router.get("/", restricted, (req, res, next) => {
  Client.getAll()
    .then((client) => {
      res.status(200).json(client);
    })
    .catch(next);
});

// Get Client By ID
router.get("/:client_class_id", restricted, (req, res, next) => {
  Client.getById(req.params.class_id)
    .then((selectedClass) => {
      res.status(200).json(selectedClass);
    })
    .catch(next);
});

// Create Client
router.post("/", restricted, (req, res, next) => {
  Client.add(req.body)
    .then((newClass) => {
      res.status(201).json(newClass);
    })
    .catch(next);
});

// Update Client
router.put("/:client_class_id", restricted, (req, res, next) => {
  Client.update(req.params.id, req.body)
    .then((updatedClass) => {
      res.status(200).json(updatedClass);
    })
    .catch(next);
});

// Delete Client
router.delete("/:client_class_id", restricted, (req, res, next) => {
  const id = req.params.id;
  deletedClass = req.existingClass;
  Client.remove(id)
    .then((deletedClass) => {
      res.status(200).json(deletedClass);
    })
    .catch(next);
});

module.exports = router;
