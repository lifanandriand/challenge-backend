const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const usersRoutes = require("./users.routes");
const notesRoutes = require("./notes.routes");

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/notes", notesRoutes);

module.exports = router;