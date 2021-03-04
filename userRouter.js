const express = require("express");
const userRouter = express.Router();

// userRouter.use((req, res, next) => {
//     console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
//     next()
// })

// userRouter.get("/", (req, res) => {
//   res.send("All Users page");
// });

// userRouter.get("/:id", (req, res) => {
//   res.send("One User page");
// });

// userRouter.post("/", (req, res) => {
//   res.send("Create User page");
// });

// userRouter.put("/:id", (req, res) => {
//   res.send("Edit User page");
// });

// userRouter.delete("/:id", (req, res) => {
//   res.send("Delete User page");
// });

//

userRouter
  .route("/:id?")
  .all((req, res, next) => {
    console.log(`${new Date().toISOString()}: ${req.originalUrl}`);
    next();
  })
  .get((req, res) => {
    if (req.params.id) {
      res.send("One User page");
    } else {
      res.send("All Users page");
    }
  })
  .put((req, res) => {
    res.send("Edit User page");
  })
  .delete((req, res) => {
    res.send("Delete User page");
  })
  .post((req, res) => {
    res.send("Create User page");
  });

module.exports = userRouter;
