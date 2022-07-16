const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notes.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware.userAuth, notesController.createNotes);

router.get("/all", authMiddleware.userAuth, notesController.listNotes);
router.get(
  "/detail/:notesId",
  authMiddleware.userAuth,
  notesController.detailNotes
);

router.put(
  "/update/:notesId",
  authMiddleware.userAuth,
  notesController.updateNotes
);
router.put(
  "/complete/:notesId",
  authMiddleware.userAuth,
  notesController.completedNotes
);

router.delete(
  "/delete/:notesId",
  authMiddleware.userAuth,
  notesController.deleteNotes
);

module.exports = router;