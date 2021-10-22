const router = require("express").Router();
const Users = require("./users-model");
const { restricted } = require("../auth/auth-middlewares");
const { requireBody } = require("./users-middleware");

// Get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    next({ apiCode: 500, apiMessage: "error getting users", ...err });
  }
});

// Get user by ID
router.get("/:id", restricted, async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    next({ apiCode: 404, apiMessage: "User Not Found." });
  }
  try {
    // console.log(id, "get id router")
    const user = await Users.findById(id);
    // console.log(user, "get id router")
    res.json(user);
  } catch (err) {
    next({ apiCode: 500, apiMessage: "Error retrieving user", ...err });
    // next(err)
  }
});

// // Create User
router.post("/", async (req, res, next) => {
  try {
    const user = await Users.add(req.body);
    res.json(user);
  } catch (err) {
    next({ apiCode: 500, apiMessage: "Error Creating User.", ...err });
  }
});

// Delete User
// router.delete("/:id", restricted, async (req, res, next) => {
//   const id = parseInt(req.params.id);
//   if (!id) {
//     next({ apiCode: 404, apiMessage: "User Not Found." });
//   }

//   try {
//     const user = await Users.remove(id, {});
//     res.json({ message: `User with id ${req.params.id} has been deleted` });
//   } catch (err) {
//     next({ apiCode: 500, apiMessage: "Error Deleting User.", ...err });
//   }
// });

// Update User
router.put("/:id", requireBody, restricted, async (req, res, next) => {
  const id = parseInt(req.params.id);
  // console.log(req.body)
  if (!id) {
    next({ apiCode: 400, apiMessage: "Provide ID", ...err });
  }

  try {
    const user = await Users.update(id, req.body);
    res.json(user);
  } catch (err) {
    next({ apiCode: 500, apiMessage: "Error Updating User.", ...err });
  }
  //   next(err)
});

module.exports = router;
